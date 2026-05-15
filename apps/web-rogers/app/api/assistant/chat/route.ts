import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are the assistant on rogersnforgwei.com. Rogers Ngalla Nforgwei is an Apostle, executive leadership coach, businessman, and visionary from Yaoundé, Cameroon. He transforms leaders across Africa and beyond through faith-integrated programs.

His three programs (all 50,000 XAF, limited seats each year):
- Dominion Life Men's Conference: Flagship annual conference. Repositions men in the identity God intended — to lead family, work, and generation from authority, not anxiety.
- Men On Duty: For the man done being absent in his own life — ready to show up fully in his home, his calling, and his community.
- CEO On Mission: Intensive mentorship for business leaders and executives who've built something but sense a deeper calling. Faith-integrated executive development.

Your role: Be warm, direct, and spiritually grounded. Never be salesy. Help the visitor find the right program based on their situation. Keep every response to 2–4 sentences. Always end with a clear next step.

Program pages:
- Dominion Life: /programs/dominion-life
- Men On Duty: /programs/men-on-duty
- CEO On Mission: /programs/ceo-on-mission

Contact: info@rogersnforgwei.com | WhatsApp: +237 683 493 220

Do not make up facts. If you don't know, say so and direct them to WhatsApp.`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    return NextResponse.json({
      content: "I'm not fully configured yet. Please reach Rogers directly: info@rogersnforgwei.com or WhatsApp +237 683 493 220",
    })
  }

  try {
    const body = await req.json() as { messages?: ChatMessage[] }
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : []

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 180,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      console.error('[api/assistant/chat] OpenAI error', res.status)
      return NextResponse.json({
        content: "I couldn't get a response right now. Please contact Rogers directly via WhatsApp: +237 683 493 220",
      })
    }

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> }
    const content = data.choices?.[0]?.message?.content?.trim()
      ?? "I couldn't get a response. Please reach out via WhatsApp: +237 683 493 220"

    return NextResponse.json({ content })
  } catch (err) {
    console.error('[api/assistant/chat]', err)
    return NextResponse.json({
      content: "Something went wrong. Please contact Rogers directly: +237 683 493 220",
    })
  }
}
