"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { connectFreighter, getAllBalances, sendTip, CONFIG } from "./stellar"
import ConnectionCard from "./components/ConnectionCard.jsx"
import TipForm from "./components/TipForm.jsx"
import LogsCard from "./components/LogsCard.jsx"
import "./App.css"

// utils
const shortG = (g) => (g ? `${g.slice(0, 6)}…${g.slice(-6)}` : "")
const fmtXLM = (s) => {
  if (s == null) return "-"
  const n = Number(s)
  if (Number.isNaN(n)) return s
  return n.toFixed(7)
}
const nowHHMMSS = () => new Date().toLocaleTimeString()
const EXPL_ACC = (g) => `https://stellar.expert/explorer/testnet/account/${g}`

export default function App() {
  const [publicKey, setPublicKey] = useState(null)
  const [balances, setBalances] = useState({ payer: null, streamer: null, platform: null })
  const [prevBalances, setPrevBalances] = useState(null)
  const [nickname, setNickname] = useState("Anon")
  const [message, setMessage] = useState("gm!")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [lastTxHash, setLastTxHash] = useState(null)
  const [lastDonationId, setLastDonationId] = useState(null)
  const [logs, setLogs] = useState([`[${nowHHMMSS()}] UI cargada. Red: Testnet.`])

  const appendLog = useCallback((line) => {
    setLogs((ls) => [...ls, `[${nowHHMMSS()}] ${line}`])
  }, [])

  const payerG = publicKey
  const streamerG = CONFIG.STREAMER
  const platformG = CONFIG.PLATFORM

  const deltas = useMemo(() => {
    if (!prevBalances) return { payer: 0, streamer: 0, platform: 0 }
    return {
      payer: Number(balances.payer ?? 0) - Number(prevBalances.payer ?? 0),
      streamer: Number(balances.streamer ?? 0) - Number(prevBalances.streamer ?? 0),
      platform: Number(balances.platform ?? 0) - Number(prevBalances.platform ?? 0),
    }
  }, [balances, prevBalances])

  const handleConnect = useCallback(async () => {
    setIsConnecting(true)
    setLastTxHash(null)
    setLastDonationId(null)
    try {
      appendLog("Conectando con Freighter…")
      const pk = await connectFreighter()
      setPublicKey(pk)
      appendLog(`✅ Conectado: ${pk}`)
      await refreshBalances(pk)
    } catch (e) {
      console.error(e)
      appendLog(`❌ ERROR conectar: ${e.message || e}`)
    } finally {
      setIsConnecting(false)
    }
  }, [appendLog])

  const refreshBalances = useCallback(
    async (pk = payerG) => {
      if (!pk) return
      setIsLoadingBalances(true)
      try {
        const b = await getAllBalances({ payer: pk, streamer: streamerG, platform: platformG })
        setBalances(b)
        appendLog("Balances actualizados.")
      } catch (e) {
        console.error(e)
        appendLog(`❌ ERROR balances: ${e.message || e}`)
      } finally {
        setIsLoadingBalances(false)
      }
    },
    [appendLog, payerG, streamerG, platformG],
  )

  const handleSendTip = useCallback(async () => {
    if (!publicKey) return
    setIsSending(true)
    setLastTxHash(null)
    setLastDonationId(null)
    try {
      appendLog("Enviando propina…")

      const prev = await getAllBalances({ payer: payerG, streamer: streamerG, platform: platformG })
      setPrevBalances(prev)

      const { hash, donationIdHex } = await sendTip({
        payerG,
        amountXLM: 0.1,
        nickname,
        message,
        onLog: (m) => appendLog(m),
      })

      setLastTxHash(hash || null)
      setLastDonationId(donationIdHex || null)
      if (hash) appendLog(`✅ Hash: ${hash}`)

      await refreshBalances(payerG)
    } catch (e) {
      console.error(e)
      appendLog(`❌ ERROR al enviar: ${e.message || e}`)
    } finally {
      setIsSending(false)
    }
  }, [appendLog, publicKey, payerG, streamerG, platformG, nickname, message, refreshBalances])

  useEffect(() => {
    if (publicKey && !isLoadingBalances) refreshBalances()
  }, [publicKey])

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="brand">
              <div className="icon">🎮</div>
              <h1>TipStreamers</h1>
            </div>
            <div className="badges">
              <div className="chip">Soroban</div>
              <div className="chip chip-secondary">Testnet</div>
            </div>
          </div>
          <div className="muted" style={{ marginTop: 6 }}>
            Dona a tus streamers favoritos con <b>XLM</b> en Stellar
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <div className="grid grid-3">
          {/* Conexión */}
          <ConnectionCard publicKey={publicKey} isConnecting={isConnecting} onConnect={handleConnect} />

          {/* Balances */}
          <div className="card card-gradient">
            <div className="card-title">💰 Balances (XLM nativo)</div>

            {!publicKey ? (
              <div className="muted">Conecta tu wallet para ver tus balances.</div>
            ) : (
              <>
                <div className="row">
                  <div>
                    <div className="muted">Payer (Tú)</div>
                    <a className="mono small" href={EXPL_ACC(payerG)} target="_blank" rel="noreferrer">
                      {shortG(payerG)} ↗
                    </a>
                  </div>
                  <button className="btn" onClick={() => refreshBalances()} disabled={isLoadingBalances}>
                    {isLoadingBalances ? "Refrescando…" : "Refrescar"}
                  </button>
                </div>

                <div className="balance">
                  <div className="big">{fmtXLM(balances.payer)}</div>
                  <div className={`delta ${deltas.payer > 0 ? "up" : deltas.payer < 0 ? "down" : ""}`}>
                    {deltas.payer > 0 ? "▲" : deltas.payer < 0 ? "▼" : "•"} {Math.abs(deltas.payer).toFixed(7)}
                  </div>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "12px 0" }} />

                <div className="row">
                  <div>
                    <div className="muted">Streamer</div>
                    <a className="mono small" href={EXPL_ACC(streamerG)} target="_blank" rel="noreferrer">
                      {shortG(streamerG)} ↗
                    </a>
                  </div>
                  <div className="mono">{fmtXLM(balances.streamer)}</div>
                </div>

                <div className="row" style={{ marginTop: 8 }}>
                  <div>
                    <div className="muted">Platform</div>
                    <a className="mono small" href={EXPL_ACC(platformG)} target="_blank" rel="noreferrer">
                      {shortG(platformG)} ↗
                    </a>
                  </div>
                  <div className="mono">{fmtXLM(balances.platform)}</div>
                </div>
              </>
            )}
          </div>

          {/* Enviar propina */}
          <TipForm
            nickname={nickname}
            message={message}
            onNicknameChange={setNickname}
            onMessageChange={setMessage}
            onSendTip={handleSendTip}
            canTip={!!publicKey}
            isSending={isSending}
            lastTxHash={lastTxHash}
            lastDonationId={lastDonationId}
          />
        </div>

        {/* Logs */}
        <div style={{ marginTop: 16 }}>
          <LogsCard logs={logs} />
        </div>

        {/* Footer simple */}
        <div className="footer" style={{ marginTop: 16 }}>
          <div className="container footer-wrap">
            <div className="mono small break">
              <b>Contrato</b>: {CONFIG.CONTRACT_ID}
            </div>
            <div className="mono small break">
              <b>Token</b>: {CONFIG.TOKEN_ID}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
