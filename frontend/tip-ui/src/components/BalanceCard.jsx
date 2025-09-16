import React from "react";

export default function BalanceCard({ title, account, balance, delta, icon }) {
  const d = Number(delta || 0);
  const deltaTxt =
    d === 0 ? "0" : (d > 0 ? `+${d.toFixed(7)}` : d.toFixed(7));

  return (
    <div className="card card-gradient">
      <div className="card-title">
        <span className="icon">{icon || "💰"}</span>{title}
      </div>
      <div className="mono small break">{account}</div>
      <div className="balance">
        <div>
          <div className="muted">Balance (XLM)</div>
          <div className="big">{balance ?? "—"}</div>
        </div>
        <div className={`delta ${d>0?"up":d<0?"down":""}`}>
          {d>0 ? "▲" : d<0 ? "▼" : "•"} {deltaTxt}
        </div>
      </div>
    </div>
  );
}
