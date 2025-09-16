#![cfg(test)]
extern crate std;

use super::*;
use soroban_sdk::testutils::{Address as _, Events as _};
use soroban_sdk::{
    Env, Address, String, Vec, BytesN, Symbol, TryIntoVal, symbol_short,
};
use soroban_sdk::token::{
    Client as TokenClient,
    StellarAssetClient,
};

// =============== Helpers ===============

/// Registra un token de prueba usando el Stellar Asset Contract v2 (SAC).
/// Devuelve el `token_id` (Address).
fn register_token(e: &Env, admin: &Address) -> Address {
 // Crea el contrato de asset y toma su Address
 let sac = e.register_stellar_asset_contract_v2(admin.clone());
 let token_id: Address = sac.address();

 // Mint inicial al admin (con mock_all_auths no hace falta firmar)
 let sac_client = StellarAssetClient::new(e, &token_id);
 sac_client.mint(admin, &1_000_000_000i128);

 token_id
}

/// Acuña `amount` a `to` (con mock_all_auths no hace falta firmar).
fn mint_to(e: &Env, token_id: &Address, _admin: &Address, to: &Address, amount: i128) {
 let sac_client = StellarAssetClient::new(e, token_id);
 sac_client.mint(to, &amount);
}

/// Registra TU contrato en el entorno de prueba y devuelve su Address.
fn register_tip_contract(e: &Env) -> Address {
 e.register(TipStreamers, ()) // forma nueva en 23.x
}

// =============== Tests ===============

#[test]
fn init_and_get_config() {
 let e = Env::default();
 e.mock_all_auths();

 let streamer = Address::generate(&e);
 let platform = Address::generate(&e);
 let admin = Address::generate(&e);

 // Token permitido
 let token_id = register_token(&e, &admin);
 let mut accepted: Vec<Address> = Vec::new(&e);
 accepted.push_back(token_id.clone());

 // Contrato + init
 let contract_id = register_tip_contract(&e);
 let c = TipStreamersClient::new(&e, &contract_id);
 c.init(&streamer, &platform, &300u32, &accepted);

 // Lectura
 let (s, p, fee, assets) = c.get_config();
 assert_eq!(s, streamer);
 assert_eq!(p, platform);
 assert_eq!(fee, 300u32);
 assert_eq!(assets.len(), 1);
 assert_eq!(assets.get(0).unwrap(), token_id);
}

#[test]
fn tip_happy_path_split_and_event() {
    let e = Env::default();
    e.mock_all_auths();

    // Accounts
    let streamer = Address::generate(&e);
    let platform = Address::generate(&e);
    let admin = Address::generate(&e);
    let payer = Address::generate(&e);

    // Token setup
    let token_id = register_token(&e, &admin);
    mint_to(&e, &token_id, &admin, &payer, 10_000_000i128);

    // Contract setup
    let contract_id = register_tip_contract(&e);
    let c = TipStreamersClient::new(&e, &contract_id);
    let mut wl: Vec<Address> = Vec::new(&e);
    wl.push_back(token_id.clone());
    c.init(&streamer, &platform, &1000u32, &wl);

    // Balances before tip
    let t = TokenClient::new(&e, &token_id);
    let bp = t.balance(&payer);
    let bs = t.balance(&streamer);
    let bpl = t.balance(&platform);

    // Execute tip
    let amount: i128 = 1_000_000;
    c.tip(
        &payer,
        &token_id,
        &amount,
        &String::from_str(&e, "Alice"),
        &String::from_str(&e, "gm!"),
    );

    // --- Captura y filtra el evento TipEmitted de *tu contrato* ---
    use soroban_sdk::TryFromVal;
    
    let all = e.events().all();
    // Asegura que hubo eventos (SAC + tuyo)
    assert!(all.len() >= 1, "No events emitted at all");

    // Encuentra el primer evento de TU contrato cuyo topic0 == "TIP"
    let mut topics_opt = None;
    let mut data_opt = None;

    for i in 0..all.len() {
        let (cid, topics, data) = all.get(i).unwrap();
        if cid == contract_id {
            let t0: Symbol = topics.get(0).unwrap().try_into_val(&e).unwrap();
            if t0 == symbol_short!("TIP") {
                topics_opt = Some(topics);
                data_opt = Some(data);
                break;
            }
        }
    }

    let topics = topics_opt.expect("TipEmitted event not found (topics)");
    let event_data = data_opt.expect("TipEmitted event not found (data)");


    // Check topics
    let topic0: Symbol  = topics.get(0).unwrap().try_into_val(&e).unwrap();
    let topic1: Address = topics.get(1).unwrap().try_into_val(&e).unwrap();
    let topic2: Address = topics.get(2).unwrap().try_into_val(&e).unwrap();
    assert_eq!(topic0, symbol_short!("TIP"));
    assert_eq!(topic1, token_id);
    assert_eq!(topic2, streamer);

    // Check data (solo los no-topic, en orden)
    let (donation_id, amount2, fee2, nick, msg, ts2, payer2):
        (BytesN<32>, i128, i128, String, String, i128, Address)
        = TryFromVal::try_from_val(&e, &event_data).unwrap();

    assert_eq!(amount2, amount);
    assert_eq!(fee2, 100_000);
    assert_eq!(nick, String::from_str(&e, "Alice"));
    assert_eq!(msg, String::from_str(&e, "gm!"));
    assert_eq!(payer2, payer);
    assert!(ts2 > 0);
    assert_eq!(donation_id.len(), 32);

    // --- Ahora sí, balances después del tip ---
    let ap  = t.balance(&payer);
    let as_ = t.balance(&streamer);
    let apl = t.balance(&platform);

    assert_eq!(bp - ap, amount, "payer paid the total amount");
    assert_eq!(as_ - bs, 900_000, "streamer received net amount");
    assert_eq!(apl - bpl, 100_000, "platform received the fee");
}


#[test]
fn add_and_remove_asset() {
 let e = Env::default();
 e.mock_all_auths();

 let streamer = Address::generate(&e);
 let platform = Address::generate(&e);
 let admin = Address::generate(&e);

 // Dos tokens
 let token_a = register_token(&e, &admin);
 let token_b = register_token(&e, &admin);

 // Contrato + init
 let contract_id = register_tip_contract(&e);
 let c = TipStreamersClient::new(&e, &contract_id);

 let mut wl: Vec<Address> = Vec::new(&e);
 wl.push_back(token_a.clone());
 c.init(&streamer, &platform, &200u32, &wl);

 // add B
 c.add_asset(&token_b);
 let (_, _, _, assets_after_add) = c.get_config();
 assert_eq!(assets_after_add.len(), 2);

 // remove A
 c.remove_asset(&token_a);
 let (_, _, _, assets_after_remove) = c.get_config();
 assert_eq!(assets_after_remove.len(), 1);
 assert_eq!(assets_after_remove.get(0).unwrap(), token_b);
}
