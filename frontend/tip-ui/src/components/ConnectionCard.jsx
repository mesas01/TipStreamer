import React from "react";

export default function ConnectionCard({ publicKey, isConnecting, onConnect }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="chip chip-secondary">Testnet</div>
        <div className="chip">Soroban</div>
      </div>

      {publicKey ? (
        <div className="row">
          <div>
            <div className="label">Wallet conectada</div>
            <div className="mono">{publicKey}</div>
          </div>
          <div className="ok-badge">✅ Conectado</div>
        </div>
      ) : (
        <div className="row">
          <div>
            <div className="label">Freighter</div>
            <p className="muted">
              Pulsa para conectar tu wallet (Network: <b>Testnet</b>).
            </p>
          </div>
          <button className="btn" onClick={onConnect} disabled={isConnecting}>
            {isConnecting ? "Conectando..." : "Conectar Freighter"}
          </button>
        </div>
      )}
    </div>
  );
}
