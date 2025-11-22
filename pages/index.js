import { useState } from "react";

const containerStyle = {
  minHeight: "100vh",
  margin: 0,
  background:
    "linear-gradient(135deg, #111827 0%, #020617 40%, #1e293b 100%)",
  color: "white",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "40px 16px"
};

const cardStyle = {
  width: "100%",
  maxWidth: "900px",
  background: "rgba(15,23,42,0.95)",
  borderRadius: "18px",
  padding: "24px 20px 28px",
  boxShadow: "0 20px 45px rgba(0,0,0,0.6)",
  border: "1px solid rgba(148,163,184,0.35)"
};

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

  const winnerLabel =
    result?.result?.winner === "me"
      ? "You"
      : result?.result?.winner === "other"
      ? "Them"
      : "No clear winner";

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            gap: "12px"
          }}
        >
          {/* Logo placeholder */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #1d4ed8 0%, #ef4444 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700
            }}
          >
            DD
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                letterSpacing: 0.5
              }}
            >
              Debate Daddy
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: "rgba(148,163,184,0.9)"
              }}
            >
              Upload your messy texts. Let Daddy deliver the verdict.
            </p>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "12px"
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(248,250,252,0.9)"
                }}
              >
                You (me)
              </label>
              <textarea
                style={{
                  marginTop: 6,
                  width: "100%",
                  minHeight: 120,
                  borderRadius: 10,
                  border: "1px solid rgba(51,65,85,1)",
                  background: "rgba(15,23,42,0.9)",
                  color: "white",
                  padding: "8px 10px",
                  fontSize: 13,
                  resize: "vertical"
                }}
                value={meText}
                onChange={(e) => setMeText(e.target.value)}
                placeholder="Paste your side of the argument here…"
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(248,250,252,0.9)"
                }}
              >
                Them (other)
              </label>
              <textarea
                style={{
                  marginTop: 6,
                  width: "100%",
                  minHeight: 120,
                  borderRadius: 10,
                  border: "1px solid rgba(51,65,85,1)",
                  background: "rgba(15,23,42,0.9)",
                  color: "white",
                  padding: "8px 10px",
                  fontSize: 13,
                  resize: "vertical"
                }}
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Paste their replies here…"
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px"
            }}
          >
            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Daddy is thinking…" : "Let Daddy Judge"}
            </button>
            <span
              style={{
                fontSize: 11,
                color: "rgba(148,163,184,0.85)"
              }}
            >
              v0.1 • Scores may be chaotic until Daddy connects to a real
              AI brain.
            </span>
          </div>
        </form>

        {/* Override default button styles */}
        <style jsx>{`
          button {
            border-radius: 999px;
            border: none;
            padding: 8px 18px;
            font-size: 14px;
            font-weight: 600;
            background: linear-gradient(
              135deg,
              #1d4ed8 0%,
              #ef4444 100%
            );
            color: white;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(15, 23, 42, 0.8);
            transition: transform 0.08s ease, box-shadow 0.08s ease,
              opacity 0.08s ease;
          }
          button:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 16px 30px rgba(15, 23, 42, 0.9);
          }
          button:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 8px 18px rgba(15, 23, 42, 0.9);
          }
          button:disabled {
            opacity: 0.6;
            cursor: default;
          }
        `}</style>

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: 14,
              padding: "8px 10px",
              borderRadius: 8,
              background: "rgba(127,29,29,0.4)",
              border: "1px solid rgba(248,113,113,0.7)",
              fontSize: 13
            }}
          >
            Daddy encountered an error: {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            style={{
              marginTop: 18,
              padding: "12px 12px 14px",
              borderRadius: 12,
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(51,65,85,1)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: 1.4,
                    color: "rgba(148,163,184,0.9)"
                  }}
                >
                  Daddy&apos;s Verdict
                </div>
                <div style={{ fontSize: 18, marginTop: 2 }}>
                  {winnerLabel} – {result.result.label}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,163,184,0.7)",
                  color: "rgba(203,213,225,0.95)"
                }}
              >
                Margin: {result.result.margin}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 6
              }}
            >
              {["me", "other"].map((side) => {
                const label = side === "me" ? "You" : "Them";
                const s = result.scores[side];

                const toxicity =
                  s.toxicity < 0.3
                    ? "Low"
                    : s.toxicity < 0.6
                    ? "Medium"
                    : "High";

                return (
                  <div
                    key={side}
                    style={{
                      padding: "9px 10px",
                      borderRadius: 10,
                      background: "rgba(15,23,42,0.9)",
                      border: "1px solid rgba(51,65,85,1)",
                      fontSize: 12
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: 4,
                        color: "rgba(226,232,240,0.95)"
                      }}
                    >
                      {label}
                    </div>
                    <div>Score: {s.total}</div>
                    <div>Positive: {s.positive}</div>
                    <div>Negative: {s.negative}</div>
                    <div>Toxicity: {toxicity}</div>
                  </div>
                );
              })}
            </div>

            <details style={{ marginTop: 10 }}>
              <summary style={{ fontSize: 12, cursor: "pointer" }}>
                Show raw JSON
              </summary>
              <pre
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  whiteSpace: "pre-wrap",
                  color: "rgba(148,163,184,0.9)"
                }}
              >
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
