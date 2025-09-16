import React from "react";

export default function TipForm({
  nickname, message,
  onNicknameChange, onMessageChange,
  onSendTip, canTip, isSending,
  lastTxHash, lastDonationId
}) {
  return (
    <div className="card">
      <div className="card-title">🎁 Enviar propina (0.1 XLM)</div>

      <div className="form-grid">
        <div>
          <label>Nickname</label>
          <input
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="Anon"
          />
        </div>
        <div>
          <label>Mensaje</label>
          <input
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="¡Gracias por el stream! 🎮"
          />
        </div>
      </div>

      <div className="row">
        <button className="btn" onClick={onSendTip} disabled={!canTip || isSending}>
          {isSending ? "Enviando..." : "Enviar 0.1 XLM"}
        </button>

        <div className="tx-info">
          {lastTxHash && (
            <div className="mono small">
              Hash:&nbsp;
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${lastTxHash}`}
                target="_blank" rel="noreferrer"
              >
                {lastTxHash}
              </a>
            </div>
          )}
          {lastDonationId && (
            <div className="mono small">donation_id: {lastDonationId}</div>
          )}
        </div>
      </div>
    </div>
  );
}
