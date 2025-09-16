// src/stellar.js
// TipStreamers frontend helper — usando @stellar/stellar-sdk (RPC v2)

import {
  Address,
  BASE_FEE,
  Contract,
  TransactionBuilder,
  xdr,
  rpc,
  nativeToScVal,
} from "@stellar/stellar-sdk";
import * as Freighter from "@stellar/freighter-api";

// =========================
// CONFIG (tus valores reales por defecto)
// =========================
export const CONFIG = {
  RPC_URL: "https://soroban-testnet.stellar.org",
  NETWORK_PASSPHRASE: "Test SDF Network ; September 2015",
  CONTRACT_ID:
    "CAI5QDAN2HFUEDPRUVPDXVCMR64MOPK223IBSAPNDUKEEDJXT2WY6Y5Y",
  TOKEN_ID:
    "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC", // XLM SAC v2
  STREAMER: "GAWLNE3ZTWQ67LMO372CTFDB5FMCUZOQYQELXG7YBRLZX7PFXAUDPGAA",
  PLATFORM: "GDP7YYAAD742W3VBHXGEKPMDISHKE2MCWP4LGAI3TKVFWWYUPSDHRLUP",
};

// =========================
// RPC client
// =========================
const server = new rpc.Server(CONFIG.RPC_URL, { allowHttp: true });

// =========================
// Utils
// =========================
export function stroopsFromXLM(xlm) {
  // 1 XLM = 10_000_000 stroops
  return BigInt(Math.round(Number(xlm) * 10_000_000));
}

function bytesToHex(uint8) {
  return Array.from(uint8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function u8ToBase64(u8) {
  // Convierte Uint8Array a base64 en navegador (sin Buffer)
  let s = "";
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s);
}

// ======== HELPERS ========
function normalizePreparedXDR(prepared) {
  // 0) Log corto para ver qué vino
  try {
    console.log(
      "[assemble] tipo:",
      typeof prepared,
      "keys:",
      Object.keys(prepared || {})
    );
  } catch {}

  // 1) Si ya es string XDR
  if (typeof prepared === "string") return prepared;

  // 2) Si es un TransactionBuilder, primero build() → Transaction
  if (prepared && typeof prepared.build === "function") {
    try {
      const built = prepared.build(); // Transaction
      // Preferimos envelope.toXDR() (string | Uint8Array)
      if (built && typeof built.toEnvelope === "function") {
        const env = built.toEnvelope();
        if (env && typeof env.toXDR === "function") {
          const x = env.toXDR();
          if (typeof x === "string") return x;
          if (x instanceof Uint8Array) return u8ToBase64(x);
        }
      }
      // Fallback: built.toXDR()
      if (typeof built.toXDR === "function") {
        const x = built.toXDR();
        if (typeof x === "string") return x;
        if (x instanceof Uint8Array) return u8ToBase64(x);
      }
    } catch (e) {
      console.warn("[assemble] build() falló:", e);
    }
  }

  // 3) Objeto con toXDR() directo
  if (prepared && typeof prepared.toXDR === "function") {
    try {
      const x = prepared.toXDR();
      if (typeof x === "string") return x;
      if (x instanceof Uint8Array) return u8ToBase64(x);
    } catch {}
  }

  // 4) Objeto con toEnvelope().toXDR()
  if (prepared && typeof prepared.toEnvelope === "function") {
    try {
      const env = prepared.toEnvelope();
      if (env && typeof env.toXDR === "function") {
        const x = env.toXDR();
        if (typeof x === "string") return x;
        if (x instanceof Uint8Array) return u8ToBase64(x);
      }
    } catch {}
  }

  // 5) Campos comunes de envoltura
  if (prepared?.envelopeXdr) return prepared.envelopeXdr;
  if (prepared?.envelope_xdr) return prepared.envelope_xdr;
  if (prepared?.xdr) return prepared.xdr;
  if (prepared?.txXdr) return prepared.txXdr;
  if (prepared?.signedTxXdr) return prepared.signedTxXdr;

  // 6) { transaction: <string|Transaction> }
  if (prepared?.transaction) {
    const t = prepared.transaction;
    if (typeof t === "string") return t;
    if (t && typeof t.toEnvelope === "function") {
      const env = t.toEnvelope();
      if (env && typeof env.toXDR === "function") {
        const x = env.toXDR();
        if (typeof x === "string") return x;
        if (x instanceof Uint8Array) return u8ToBase64(x);
      }
    }
    if (t && typeof t.toXDR === "function") {
      const x = t.toXDR();
      if (typeof x === "string") return x;
      if (x instanceof Uint8Array) return u8ToBase64(x);
    }
  }

  // 7) { tx: <string|Transaction> }
  if (prepared?.tx) {
    const t = prepared.tx;
    if (typeof t === "string") return t;
    if (t && typeof t.toEnvelope === "function") {
      const env = t.toEnvelope();
      if (env && typeof env.toXDR === "function") {
        const x = env.toXDR();
        if (typeof x === "string") return x;
        if (x instanceof Uint8Array) return u8ToBase64(x);
      }
    }
    if (t && typeof t.toXDR === "function") {
      const x = t.toXDR();
      if (typeof x === "string") return x;
      if (x instanceof Uint8Array) return u8ToBase64(x);
    }
  }

  console.warn("[assembleTransaction] forma inesperada:", prepared);
  throw new Error("assembleTransaction no devolvió un XDR válido (revisa consola).");

  
}

function normalizeSignedXDR(res) {
  // Freighter.signTransaction puede devolver string o un objeto con la cadena
  if (typeof res === "string") return res;
  if (res?.signedXDR) return res.signedXDR;
  if (res?.signedTxXdr) return res.signedTxXdr;
  if (res?.xdr) return res.xdr;
  if (res?.tx?.envelope_xdr) return res.tx.envelope_xdr;
  throw new Error("Freighter no devolvió un XDR firmado reconocible.");
}
// =========================

export async function connectFreighter() {
  // Toma el namespace del paquete o el objeto global inyectado por la extensión
  const api =
    (typeof window !== "undefined" && window.freighterApi) ||
    (typeof Freighter === "object" ? Freighter : null);

  if (!api) {
    throw new Error(
      "Freighter no está disponible. Instálalo/actívalo y selecciona Testnet."
    );
  }

  try {
    console.log("[Freighter] Métodos disponibles:", Object.keys(api));
  } catch {}

  // 0) Asegurar que el sitio esté permitido (abre prompt si hace falta)
  try {
    const allowedResp = await api.isAllowed?.();
    const isAllowed =
      typeof allowedResp === "boolean"
        ? allowedResp
        : allowedResp?.isAllowed ?? false;

    if (!isAllowed && typeof api.setAllowed === "function") {
      const setResp = await api.setAllowed();
      const nowAllowed =
        typeof setResp === "boolean" ? setResp : !!setResp?.isAllowed;
      if (!nowAllowed) {
        throw new Error("Debes permitir este sitio en Freighter para continuar.");
      }
    }
  } catch (e) {
    console.warn("[Freighter] isAllowed/setAllowed error:", e);
  }

  // 1) getPublicKey()
  try {
    if (typeof api.getPublicKey === "function") {
      const pub = await api.getPublicKey();
      if (pub && typeof pub === "string" && pub.startsWith("G")) return pub;
    }
  } catch (e) {
    console.warn("[Freighter] getPublicKey falló:", e);
  }

  // 2) requestAccess() -> { address: "G..." }
  try {
    if (typeof api.requestAccess === "function") {
      const res = await api.requestAccess();
      const addr = res?.address || res?.publicKey || res?.pubkey || null;
      if (addr && addr.startsWith("G")) return addr;
    }
  } catch (e) {
    console.warn("[Freighter] requestAccess falló:", e);
  }

  // 3) connect() + getPublicKey()
  try {
    if (typeof api.connect === "function") {
      await api.connect();
      if (typeof api.getPublicKey === "function") {
        const pub = await api.getPublicKey();
        if (pub && pub.startsWith("G")) return pub;
      }
    }
  } catch (e) {
    console.warn("[Freighter] connect/getPublicKey falló:", e);
  }

  // 4) getAddress()
  try {
    if (typeof api.getAddress === "function") {
      const addr = await api.getAddress();
      if (addr && addr.startsWith("G")) return addr;
    }
  } catch (e) {
    console.warn("[Freighter] getAddress falló:", e);
  }

  // 5) requestPublicKey()
  try {
    if (typeof api.requestPublicKey === "function") {
      const pub = await api.requestPublicKey();
      if (pub && pub.startsWith("G")) return pub;
    }
  } catch (e) {
    console.warn("[Freighter] requestPublicKey falló:", e);
  }

  throw new Error(
    "No se obtuvo la publicKey desde Freighter (ninguna variante respondió)."
  );
}

// =========================
// Balances (XLM nativo) vía Horizon testnet REST
// =========================
async function fetchNativeBalance(accountG) {
  const url = `https://horizon-testnet.stellar.org/accounts/${accountG}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo obtener balance para ${accountG}`);
  const data = await res.json();
  const native = (data.balances || []).find((b) => b.asset_type === "native");
  return native ? native.balance : "0";
}

export async function getAllBalances({ payer, streamer, platform }) {
  const [payerBal, streamerBal, platformBal] = await Promise.all([
    fetchNativeBalance(payer),
    fetchNativeBalance(streamer),
    fetchNativeBalance(platform),
  ]);
  return { payer: payerBal, streamer: streamerBal, platform: platformBal };
}

// =========================
// Invocar tip() del contrato
// =========================
export async function sendTip({
  payerG,
  amountXLM = 0.1,
  nickname = "Anon",
  message = "gm!",
  onLog = () => {},
}) {
  onLog("Construyendo transacción...");

  // 1) Cargar cuenta (para sequence)
  const account = await server.getAccount(payerG);

  // 2) Preparar contrato y args
  const contract = new Contract(CONFIG.CONTRACT_ID);
  const amountStroops = stroopsFromXLM(amountXLM); // i128 (BigInt)

  // Convertir a ScVal (Address/i128/string)
  const args = [
    Address.fromString(payerG).toScVal(),
    Address.fromString(CONFIG.TOKEN_ID).toScVal(),
    nativeToScVal(amountStroops, { type: "i128" }),
    nativeToScVal(nickname, { type: "string" }),
    nativeToScVal(message, { type: "string" }),
  ];

  // 3) Tx invoke
  let tx = new TransactionBuilder(account, {
    fee: String(BASE_FEE),
    networkPassphrase: CONFIG.NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call("tip", ...args))
    .setTimeout(60)
    .build();

  // 4) Simulate
  onLog("Simulando...");
  const sim = await server.simulateTransaction(tx);

  // ---- LOG DEL SIMULATE ----
  try {
    console.log("[simulate] result shape:", {
      minResourceFee: sim?.minResourceFee,
      hasTransactionData: !!sim?.transactionData,
      eventsCount: sim?.events?.length ?? 0,
      authCount: sim?.auth?.length ?? 0,
      hasResult: !!sim?.result,
    });
  } catch {}
  // --------------------------

  if (rpc.Api.isSimulationError(sim)) {
    throw new Error("simulateTransaction error: " + JSON.stringify(sim));
  }

  // 5) Ensamblar con footprint/auth
  const prepared = rpc.assembleTransaction(tx, sim, CONFIG.NETWORK_PASSPHRASE);
  const preparedXDR = normalizePreparedXDR(prepared);

  // 6) Firmar con Freighter
  onLog("Solicitando firma en Freighter...");
  const signedRes = await Freighter.signTransaction(preparedXDR, {
    networkPassphrase: CONFIG.NETWORK_PASSPHRASE,
  });
  const signedXDR = normalizeSignedXDR(signedRes);

  // 7) Reconstruir y enviar
  const signedTx = TransactionBuilder.fromXDR(
    signedXDR,
    CONFIG.NETWORK_PASSPHRASE
  );
  onLog("Enviando transacción...");
  const sendResp = await server.sendTransaction(signedTx);

  // 8) Poll robusto (~120s)
onLog("Confirmando (poll)...");
const txHash = sendResp.hash;
onLog(`Hash: ${txHash} — abrir: https://stellar.expert/explorer/testnet/tx/${txHash}`);

let status = sendResp.status;
let getResp = sendResp;
const maxTries = 100;

for (let i = 0; i < maxTries; i++) {
  if (
    status !== rpc.Api.GetTransactionStatus.NOT_FOUND &&
    status !== rpc.Api.GetTransactionStatus.PENDING
  ) break;
  await new Promise((r) => setTimeout(r, 1200));
  getResp = await server.getTransaction(txHash);
  status = getResp.status;
}

if (status === rpc.Api.GetTransactionStatus.SUCCESS) {
  onLog("✅ Confirmada en red.");
} else if (status === rpc.Api.GetTransactionStatus.FAILED) {
  throw new Error("Transacción FAILED: " + JSON.stringify(getResp));
} else {
  onLog("⏳ Sigue PENDING. Abre el hash en el explorer para ver el estado en vivo.");
}


  // (Opcional) Leer retorno donation_id (BytesN<32>)
  let donationIdHex = null;
  try {
    const ret = getResp.result?.retval;
    if (ret) {
      const scv = xdr.ScVal.fromXDR(ret.toXDR());
      if (scv.switch().name === "scvBytes") {
        donationIdHex = bytesToHex(scv.bytes());
      }
    }
  } catch {
    /* noop */
  }

  onLog(`¡Listo! hash: ${txHash}`);
  return { hash: txHash, donationIdHex };
}
