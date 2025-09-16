#![allow(non_snake_case)]
#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracterror, contractevent,
    symbol_short, panic_with_error,
    Address, Bytes, BytesN, Env, String, Symbol, Vec,
};

use soroban_sdk::token::Client as TokenClient;
use soroban_sdk::xdr::ToXdr;

// -------------------------
// Storage keys
// -------------------------
const KEY_STREAMER: Symbol = symbol_short!("STRM");
const KEY_PLATFORM: Symbol = symbol_short!("PLAT");
const KEY_FEE_BPS: Symbol = symbol_short!("FBPS");
const KEY_ASSETS: Symbol = symbol_short!("ASST");

// -------------------------
// Errors
// -------------------------
#[contracterror]
#[derive(Copy, Clone)]
pub enum Error {
    BadFee = 1,
    ZeroAmount = 2,
    AssetNotAllowed = 3,
    AssetAlreadyExists = 4,
    AlreadyInitialized = 5,
}

// -------------------------
// Event type
// -------------------------
#[contractevent]
#[derive(Clone, Debug)]
pub struct TipEmitted {
    #[topic]
    pub kind: Symbol,
    #[topic]
    pub asset: Address,
    #[topic]
    pub streamer: Address,
    pub donation_id: BytesN<32>,
    pub amount: i128,
    pub fee: i128,
    pub nickname: String,
    pub message: String,
    pub ts: i128,
    pub payer: Address,
}

// -------------------------
// Storage helpers
// -------------------------
fn put_streamer(e: &Env, addr: &Address) { e.storage().persistent().set(&KEY_STREAMER, addr); }
fn get_streamer(e: &Env) -> Address {
    e.storage().persistent().get(&KEY_STREAMER).unwrap()
}

fn put_platform(e: &Env, addr: &Address) { e.storage().persistent().set(&KEY_PLATFORM, addr); }
fn get_platform(e: &Env) -> Address {
    e.storage().persistent().get(&KEY_PLATFORM).unwrap()
}

fn put_fee_bps(e: &Env, bps: &u32) { e.storage().persistent().set(&KEY_FEE_BPS, bps); }
fn get_fee_bps(e: &Env) -> u32 {
    e.storage().persistent().get(&KEY_FEE_BPS).unwrap()
}

fn put_assets(e: &Env, assets: &Vec<Address>) { e.storage().persistent().set(&KEY_ASSETS, assets); }
fn get_assets(e: &Env) -> Vec<Address> {
    e.storage().persistent().get(&KEY_ASSETS).unwrap()
}

fn asset_allowed(e: &Env, asset: &Address) -> bool {
    let list = get_assets(e);
    list.iter().any(|a| a == *asset)
}

// -------------------------
// Fee & IDs
// -------------------------
fn calc_fee(amount: i128, fee_bps: u32) -> i128 {
    (amount * (fee_bps as i128)) / 10_000
}

fn make_donation_id(e: &Env, payer: &Address, ts: i128, amount: i128, asset: &Address) -> BytesN<32> {
    let mut b = Bytes::new(e);

    let payer_x = payer.to_xdr(e);
    b.append(&payer_x);

    let ts_b = ts.to_be_bytes();
    b.append(&Bytes::from_slice(e, &ts_b));

    let amt_b = amount.to_be_bytes();
    b.append(&Bytes::from_slice(e, &amt_b));

    let asset_x = asset.to_xdr(e);
    b.append(&asset_x);

    e.crypto().sha256(&b).into()
}

// -------------------------
// Contract
// -------------------------
#[contract]
pub struct TipStreamers;

#[contractimpl]
impl TipStreamers {
    /// Inicializa el perfil del streamer.
    pub fn init(e: Env, streamer: Address, platform: Address, fee_bps: u32, accepted_assets: Vec<Address>) {
        if e.storage().persistent().has(&KEY_STREAMER) {
            panic_with_error!(&e, Error::AlreadyInitialized);
        }
        streamer.require_auth(); // firma del dueño
        if fee_bps > 10_000 { panic_with_error!(&e, Error::BadFee); }
        if accepted_assets.is_empty() { panic_with_error!(&e, Error::AssetNotAllowed); }

        // de-dup de assets
        let mut uniq: Vec<Address> = Vec::new(&e);
        for a in accepted_assets.iter() {
            if !uniq.contains(&a) { uniq.push_back(a.clone()); }
        }

        put_streamer(&e, &streamer);
        put_platform(&e, &platform);
        put_fee_bps(&e, &fee_bps);
        put_assets(&e, &uniq);
    }

    /// Cambia el fee en basis points (requiere firma del streamer).
    pub fn set_fee_bps(e: Env, new_fee_bps: u32) {
        let streamer = get_streamer(&e);
        streamer.require_auth();
        if new_fee_bps > 10_000 { panic_with_error!(&e, Error::BadFee); }
        put_fee_bps(&e, &new_fee_bps);
    }

    /// Agrega un asset permitido (requiere firma del streamer).
    pub fn add_asset(e: Env, asset: Address) {
        let streamer = get_streamer(&e);
        streamer.require_auth();

        let mut list = get_assets(&e);
        if list.contains(&asset) {
            panic_with_error!(&e, Error::AssetAlreadyExists);
        }
        list.push_back(asset);
        put_assets(&e, &list);
    }

    /// Remueve un asset permitido (requiere firma del streamer).
    pub fn remove_asset(e: Env, asset: Address) {
        let streamer = get_streamer(&e);
        streamer.require_auth();

        let mut list = get_assets(&e);
        if let Some(pos) = list.iter().position(|a| a == asset) {
            list.remove(pos as u32);
            put_assets(&e, &list);
        } else {
            panic_with_error!(&e, Error::AssetNotAllowed);
        }
    }

    pub fn tip(
        e: Env,
        payer: Address,
        asset: Address,
        amount: i128,
        nickname: String,
        message: String,
    ) -> BytesN<32> {
        payer.require_auth();
        if amount <= 0 { panic_with_error!(&e, Error::ZeroAmount); }
        if !asset_allowed(&e, &asset) { panic_with_error!(&e, Error::AssetNotAllowed); }

        let streamer = get_streamer(&e);
        let platform = get_platform(&e);
        let fee_bps  = get_fee_bps(&e);
        let fee = calc_fee(amount, fee_bps);
        if fee < 0 || fee > amount { panic_with_error!(&e, Error::BadFee); }
        let to_streamer = amount - fee;

        let token = TokenClient::new(&e, &asset);

        token.transfer(&payer, &streamer, &to_streamer);
        // --- autorización explícita para transfer al streamer ---
        if fee > 0 {
            token.transfer(&payer, &platform, &fee);
        }

        let ts: i128 = e.ledger().timestamp().into();
        let donation_id = make_donation_id(&e, &payer, ts, amount, &asset);

        let ev = TipEmitted {
            kind: symbol_short!("TIP"),
            asset: asset.clone(),
            streamer: streamer.clone(),
            donation_id: donation_id.clone(),
            amount,
            fee,
            nickname,
            message,
            ts,
            payer: payer.clone(),
        };
        ev.publish(&e);

        donation_id
    }



    /// Lectura para UI/backend.
    pub fn get_config(e: Env) -> (Address, Address, u32, Vec<Address>) {
        (get_streamer(&e), get_platform(&e), get_fee_bps(&e), get_assets(&e))
    }
}

#[cfg(test)]
mod test;
