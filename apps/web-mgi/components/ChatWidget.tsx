"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm the MGI Assistant. Ask me anything about Mina-Galeed Invest, our ventures, or our services — in English or French.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || data.error || "Sorry, something went wrong.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const startListening = () => {
    const SpeechRecognitionAPI =
      (typeof window !== "undefined" &&
        (window.SpeechRecognition || window.webkitSpeechRecognition)) ||
      null;

    if (!SpeechRecognitionAPI) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      send(transcript);
    };

    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const MGI_GREEN = "#0d6e36";

  return (
    <>
      {/* ── CHAT PANEL ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 24,
            width: 380,
            maxWidth: "calc(100vw - 48px)",
            height: 520,
            maxHeight: "calc(100vh - 120px)",
            background: "#ffffff",
            borderRadius: 20,
            boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 24px rgba(13,110,54,0.12)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid rgba(13,110,54,0.15)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: MGI_GREEN,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🌿
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0, lineHeight: 1 }}>
                  MGI Assistant
                </p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, margin: "3px 0 0", lineHeight: 1 }}>
                  Always here to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none", cursor: "pointer",
                color: "white", fontSize: 18,
                width: 32, height: 32, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1, overflowY: "auto", padding: "16px",
              display: "flex", flexDirection: "column", gap: 12,
              background: "#f9fafb",
            }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.role === "user" ? MGI_GREEN : "#ffffff",
                    color: msg.role === "user" ? "#fff" : "#111827",
                    fontSize: 13,
                    lineHeight: 1.6,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    border: msg.role === "assistant" ? "1px solid #e5e7eb" : "none",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "18px 18px 18px 4px",
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    display: "flex", gap: 5, alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: MGI_GREEN, opacity: 0.5,
                        animation: `bounce 1.2s ease-in-out ${dot * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "12px 16px",
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about MGI..."
              disabled={loading}
              style={{
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 13,
                outline: "none",
                background: "#f9fafb",
                color: "#111827",
              }}
            />

            {/* Mic button */}
            <button
              onClick={listening ? stopListening : startListening}
              title={listening ? "Stop listening" : "Speak your question"}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                border: "none", cursor: "pointer",
                background: listening ? "#ef4444" : "#f0fdf4",
                color: listening ? "white" : MGI_GREEN,
                fontSize: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: listening ? "0 0 0 4px rgba(239,68,68,0.2)" : "none",
                transition: "all 0.2s",
              }}
            >
              🎤
            </button>

            {/* Send button */}
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                background: input.trim() && !loading ? MGI_GREEN : "#e5e7eb",
                color: "white",
                fontSize: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* ── FLOATING BUTTON ── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        title="Chat with MGI Assistant"
        style={{
          position: "fixed",
          bottom: 24, right: 24,
          width: 60, height: 60,
          borderRadius: "50%",
          background: MGI_GREEN,
          border: "none", cursor: "pointer",
          boxShadow: "0 8px 32px rgba(13,110,54,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
          zIndex: 9998,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
