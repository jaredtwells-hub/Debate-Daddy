import { useState } from "react";

export default function Home() {
  const [meText, setMeText] = useState("");
  const [otherText, setOtherText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { speaker: "me", text: meText },
            { speaker: "other", text: otherText }
          ]
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "24px", fontFamily: "system-ui, sans-serif" }}>
      <h1>Debate Daddy (Backend MVP)</h1>
      <p>Paste two sides of a fight and let Daddy judge.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>
            <div>🧍‍♂️ You (me)</div>
            <textarea
              style={{ width: "100%", minHeight: "80px" }}
              value={meText}
              onChange={(e) => setMeText(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>
            <div>👤 Them (other)</div>
            <textarea
              style={{ width: "100%", minHeight: "80px" }}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          {loading ? "Daddy is thinking…" : "Judge this fight"}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: "16px", color: "red" }}>
          Error: {error}
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}
        >
          <h2>Raw result JSON (for now)</h2>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
