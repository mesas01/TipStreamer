import React, { useEffect, useRef } from "react";

export default function LogsCard({ logs }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  return (
    <div className="card">
      <div className="card-title">📜 Logs</div>
      <div ref={ref} className="logs">
        {logs.map((l, i) => (
          <div key={i} className="mono small">{l}</div>
        ))}
      </div>
    </div>
  );
}
