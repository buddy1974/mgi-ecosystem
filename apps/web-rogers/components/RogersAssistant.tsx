'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'

const hl = "var(--font-headline, 'Nunito', system-ui, sans-serif)"

type Phase = 'tree' | 'chat' | 'lead-name' | 'lead-email' | 'lead-done'

interface Option {
  label: string
  type: 'tree' | 'gpt' | 'lead' | 'link'
  value?: string
  href?: string
}

interface Msg {
  role: 'assistant' | 'user'
  content: string
  options?: Option[]
}

const TREE: Record<string, { content: string; options: Option[] }> = {
  root: {
    content: "Welcome! I'm here to help you find the right program. What best describes where you are right now?",
    options: [
      { label: 'I lead a business or organisation', type: 'tree', value: 'executive' },
      { label: 'I want to lead my family better',   type: 'tree', value: 'family'    },
      { label: "I'm hungry for spiritual growth",   type: 'tree', value: 'spiritual' },
      { label: 'I have a specific question',        type: 'tree', value: 'open'      },
    ],
  },
  executive: {
    content: "CEO On Mission was built for leaders like you — men who've built something but sense a deeper calling. It's Rogers' most intensive program: faith-integrated executive mentorship with limited seats.",
    options: [
      { label: 'Apply for CEO On Mission →', type: 'link', href: '/programs/ceo-on-mission?source=assistant#registration' },
      { label: 'Tell me more',               type: 'gpt',  value: 'Tell me more about the CEO On Mission program and what it involves.' },
      { label: 'Get priority updates',       type: 'lead', value: 'CEO On Mission' },
    ],
  },
  family: {
    content: "Two programs could fit. Dominion Life repositions men in the identity God intended — powerful for family leaders. Men On Duty is for the man done being absent, ready to show up fully at home and in his calling.",
    options: [
      { label: 'Tell me about Dominion Life', type: 'tree', value: 'dominion' },
      { label: 'Tell me about Men On Duty',   type: 'tree', value: 'mod'      },
      { label: 'Help me choose',              type: 'gpt',  value: 'I want to lead my family better. Which program — Dominion Life or Men On Duty — is the better fit for me?' },
    ],
  },
  dominion: {
    content: "Dominion Life is Rogers' flagship conference. It doesn't teach facts about manhood — it repositions you in the authority God gave you, so you lead your family and generation from identity, not insecurity.",
    options: [
      { label: 'Reserve My Seat →',    type: 'link', href: '/programs/dominion-life?source=assistant#registration' },
      { label: 'Tell me more',         type: 'gpt',  value: "Tell me more about the Dominion Life Men's Conference — what happens there and what men experience." },
      { label: 'Get priority updates', type: 'lead', value: 'Dominion Life' },
    ],
  },
  mod: {
    content: "Men On Duty is for the man done being busy but absent — equipped to show up fully in his home, his calling, and his community. Practical. Transformational. Brotherhood-driven.",
    options: [
      { label: 'Join the Brotherhood →', type: 'link', href: '/programs/men-on-duty?source=assistant#registration' },
      { label: 'Tell me more',           type: 'gpt',  value: 'Tell me more about the Men On Duty program and what makes it different.' },
      { label: 'Get priority updates',   type: 'lead', value: 'Men On Duty' },
    ],
  },
  spiritual: {
    content: "Dominion Life is where you start. Rogers' signature conference — it's not a seminar. Men walk in carrying one identity and walk out standing in another. It's a repositioning.",
    options: [
      { label: 'Reserve My Seat →',    type: 'link', href: '/programs/dominion-life?source=assistant#registration' },
      { label: 'Tell me more',         type: 'gpt',  value: 'Tell me more about the spiritual transformation that happens in Dominion Life.' },
      { label: 'Get priority updates', type: 'lead', value: 'Dominion Life' },
    ],
  },
  open: {
    content: "Of course — ask me anything about Rogers' programs, his work, or what might be right for you.",
    options: [],
  },
}

const GREETING: Msg = {
  role: 'assistant',
  content: TREE.root.content,
  options: TREE.root.options,
}

export default function RogersAssistant() {
  const [open, setOpen]               = useState(false)
  const [phase, setPhase]             = useState<Phase>('tree')
  const [messages, setMessages]       = useState<Msg[]>([GREETING])
  const [input, setInput]             = useState('')
  const [loading, setLoading]         = useState(false)
  const [leadName, setLeadName]       = useState('')
  const [leadInterest, setLeadInterest] = useState('')
  const scrollRef                     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  function addMsg(msg: Msg) {
    setMessages(prev => [...prev, msg])
  }

  async function sendToGPT(userText: string) {
    setPhase('chat')
    addMsg({ role: 'user', content: userText })
    setInput('')
    setLoading(true)

    const history = messages.map(m => ({ role: m.role, content: m.content }))
    history.push({ role: 'user', content: userText })

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json() as { content?: string }
      addMsg({
        role: 'assistant',
        content: data.content ?? "I couldn't get a response. Please contact Rogers directly.",
        options: [{ label: 'Get priority updates', type: 'lead', value: '' }],
      })
    } catch {
      addMsg({ role: 'assistant', content: 'Network error. Please reach Rogers on WhatsApp: +237 683 493 220' })
    } finally {
      setLoading(false)
    }
  }

  function handleOption(opt: Option) {
    if (opt.type === 'link' && opt.href) {
      window.location.href = opt.href
      return
    }
    if (opt.type === 'tree' && opt.value) {
      addMsg({ role: 'user', content: opt.label })
      const node = TREE[opt.value]
      if (node) {
        setTimeout(() => {
          addMsg({ role: 'assistant', content: node.content, options: node.options })
          if (node.options.length === 0) setPhase('chat')
        }, 320)
      }
      return
    }
    if (opt.type === 'gpt' && opt.value) {
      void sendToGPT(opt.value)
      return
    }
    if (opt.type === 'lead') {
      setLeadInterest(opt.value ?? '')
      addMsg({ role: 'user', content: 'Get priority updates' })
      setTimeout(() => {
        addMsg({ role: 'assistant', content: "Great — I'd love to pass your details on. What's your name?" })
        setPhase('lead-name')
      }, 320)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const value = input.trim()
    if (!value || loading) return

    if (phase === 'lead-name') {
      setLeadName(value)
      setInput('')
      addMsg({ role: 'user', content: value })
      setTimeout(() => {
        addMsg({ role: 'assistant', content: `Thanks, ${value}. And your email address?` })
        setPhase('lead-email')
      }, 320)
      return
    }

    if (phase === 'lead-email') {
      setInput('')
      addMsg({ role: 'user', content: value })
      setLoading(true)
      try {
        await fetch('/api/assistant/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: leadName, email: value, interest: leadInterest }),
        })
      } catch { /* fire and forget */ }
      setLoading(false)
      addMsg({
        role: 'assistant',
        content: `You're on the list, ${leadName}. Rogers' team will be in touch. Seats fill fast — when you're ready, don't wait.`,
        options: [
          { label: 'View Programs',    type: 'link', href: '/programs/dominion-life?source=assistant' },
          { label: 'WhatsApp Rogers',  type: 'link', href: 'https://wa.me/237683493220' },
        ],
      })
      setPhase('lead-done')
      return
    }

    void sendToGPT(value)
  }

  const inputPlaceholder =
    phase === 'lead-name'  ? 'Your full name…'    :
    phase === 'lead-email' ? 'your@email.com…'    :
    'Ask anything…'

  const isPrimary = (opt: Option) =>
    opt.type === 'link' && (opt.href?.includes('#registration') ?? false)

  return (
    <>
      <style>{`
        @keyframes rn-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes rn-slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rn-chat-scroll::-webkit-scrollbar { display: none; }
        .rn-opt-btn:hover { background: rgba(255,255,255,0.14) !important; }
        .rn-opt-primary:hover { opacity: 0.88 !important; }
      `}</style>

      {/* Floating toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close assistant' : 'Open Rogers AI assistant'}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 2000,
          background: open
            ? 'rgba(13,1,32,0.95)'
            : 'linear-gradient(135deg, #f72585, #7209b7)',
          color: '#ffffff',
          border: open ? '1px solid rgba(255,255,255,0.15)' : 'none',
          borderRadius: '999px',
          padding: '13px 22px',
          cursor: 'pointer',
          fontFamily: hl, fontWeight: 700, fontSize: 14,
          letterSpacing: '0.02em',
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 8px 32px rgba(247,37,133,0.45)',
          display: 'flex', alignItems: 'center', gap: 8,
          transition: 'all 0.25s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {open ? '✕  Close' : '✦  Ask Rogers AI'}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 1999,
          width: 364,
          maxWidth: 'calc(100vw - 32px)',
          height: 510,
          maxHeight: 'calc(100vh - 120px)',
          background: 'rgba(10,1,24,0.98)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20,
          boxShadow: '0 24px 80px rgba(0,0,0,0.65)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'rn-slideUp 0.22s ease',
        }}>

          {/* Header */}
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', gap: 10,
            flexShrink: 0,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #f72585, #7209b7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, flexShrink: 0,
            }}>✦</div>
            <div>
              <p style={{ color: '#ffffff', fontFamily: hl, fontWeight: 700, fontSize: 13, margin: 0 }}>Rogers AI</p>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: hl, fontSize: 11, margin: 0 }}>Find your program</p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="rn-chat-scroll"
            style={{
              flex: 1, overflowY: 'auto',
              padding: '14px 14px 8px',
              display: 'flex', flexDirection: 'column', gap: 10,
              scrollbarWidth: 'none',
            }}
          >
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 7 }}>
                  <div style={{
                    maxWidth: '86%',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #f72585, #7209b7)'
                      : 'rgba(255,255,255,0.07)',
                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.10)' : 'none',
                    borderRadius: msg.role === 'user'
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    padding: '9px 13px',
                    color: '#ffffff',
                    fontFamily: hl, fontSize: 13, lineHeight: 1.65,
                  }}>
                    {msg.content}
                  </div>

                  {/* Option pills — only on last message */}
                  {isLast && msg.options && msg.options.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-start', width: '100%' }}>
                      {msg.options.map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => handleOption(opt)}
                          className={isPrimary(opt) ? 'rn-opt-primary' : 'rn-opt-btn'}
                          style={{
                            background: isPrimary(opt)
                              ? 'linear-gradient(135deg, #f72585, #7209b7)'
                              : 'rgba(255,255,255,0.07)',
                            border: isPrimary(opt) ? 'none' : '1px solid rgba(255,255,255,0.16)',
                            color: '#ffffff',
                            borderRadius: '999px',
                            padding: '7px 15px',
                            fontFamily: hl, fontSize: 12, fontWeight: 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.18s',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '10px 14px',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(k => (
                    <span key={k} style={{
                      display: 'block', width: 5, height: 5, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.45)',
                      animation: `rn-bounce 1.2s ${k * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          {phase !== 'lead-done' && (
            <form
              onSubmit={e => { void handleSubmit(e) }}
              style={{
                padding: '10px 14px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', gap: 8, flexShrink: 0,
              }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                disabled={loading}
                autoComplete="off"
                style={{
                  flex: 1, minWidth: 0,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '999px',
                  padding: '9px 15px',
                  color: '#ffffff', fontFamily: hl, fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                style={{
                  width: 38, height: 38, flexShrink: 0,
                  background: 'linear-gradient(135deg, #f72585, #7209b7)',
                  border: 'none', borderRadius: '50%',
                  color: '#ffffff', fontSize: 15,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.35 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                →
              </button>
            </form>
          )}

          {/* Brand footer */}
          <p style={{
            color: 'rgba(255,255,255,0.18)',
            fontFamily: hl, fontSize: 10,
            textAlign: 'center',
            padding: '6px 0 10px',
            margin: 0,
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}>
            Powered by Rogers Nforgwei AI
          </p>
        </div>
      )}
    </>
  )
}
