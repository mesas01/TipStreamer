import { useState } from "react";
// Probamos TODAS las variantes de import por compatibilidad
import * as FreighterNS from "@stellar/freighter-api";
import FreighterDefault from "@stellar/freighter-api";
import {
  isConnected as isConnectedNamed,
  requestAccess as requestAccessNamed,
  getPublicKey as getPublicKeyNamed,
  getUserInfo as getUserInfoNamed,
  hasAllowed as hasAllowedNamed,
  setAllowed as setAllowedNamed,
} from "@stellar/freighter-api";

function pick(...fns) {
  // devuelve la primera función válida
  return fns.find((f) => typeof f === "function");
}

export default function App() {
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    try {
      // 1) Elegimos funciones disponibles desde: named, default, namespace
      const isConnected =
        pick(isConnectedNamed, FreighterDefault?.isConnected, FreighterNS?.isConnected) ||
        (async () => false);

      const requestAccess =
        pick(requestAccessNamed, FreighterDefault?.requestAccess, FreighterNS?.requestAccess);

      const getPublicKey =
        pick(getPublicKeyNamed, FreighterDefault?.getPublicKey, FreighterNS?.getPublicKey);

      const getUserInfo =
        pick(getUserInfoNamed, FreighterDefault?.getUserInfo, FreighterNS?.getUserInfo);

      const hasAllowed = pick(
        hasAllowedNamed,
        FreighterDefault?.hasAllowed,
        FreighterNS?.hasAllowed
      );
      const setAllowed = pick(
        setAllowedNamed,
        FreighterDefault?.setAllowed,
        FreighterNS?.setAllowed
      );

      // 2) ¿Extensión disponible?
      const available = await isConnected().catch(() => false);
      if (!available) {
        setStatus("Freighter no disponible o bloqueada en este sitio.");
        return;
      }

      // 3) (Opcional) permitir el sitio, si tu versión lo requiere
      if (hasAllowed && setAllowed) {
        const allowed = await hasAllowed().catch(() => true);
        if (!allowed) await setAllowed(true);
      }

      // 4) Pedir acceso (muestra popup)
      if (requestAccess) await requestAccess();

      // 5) Obtener la public key
      let pk = null;
      if (getPublicKey) {
        pk = await getPublicKey();
      } else if (getUserInfo) {
        const ui = await getUserInfo();
        pk = ui?.publicKey || null;
      }

      if (!pk) throw new Error("No pude leer la public key desde Freighter.");
      setAccount(pk);
      setStatus("Conectado ✅");
    } catch (e) {
      console.error(e);
      setStatus(`Error conectando: ${e?.message || e}`);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>TipStreamers MVP</h1>
      <button onClick={connectWallet}>{account ? "Conectado ✅" : "Conectar Freighter"}</button>
      {account && (
        <p style={{ marginTop: 8 }}>
          Cuenta: <b>{account}</b>
        </p>
      )}
      {status && <p style={{ marginTop: 8 }}>{status}</p>}
    </div>
  );
}
