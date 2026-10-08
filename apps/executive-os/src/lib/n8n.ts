const N8N_BASE_URL = process.env.N8N_BASE_URL ?? 'https://n8n.maxpromo.digital'
// N8N_SECRET must be set via environment variable — no fallback for security.
// Required in: Vercel env vars (executive-os), .env.local for local dev.
// NOTE: rotate the secret in n8n if the previous value appeared in Git history.
const N8N_SECRET = process.env.N8N_SECRET

export async function triggerN8nWorkflow(
  slug: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  if (!N8N_SECRET) {
    console.error('[n8n] N8N_SECRET env var is not set — workflow not triggered:', slug)
    return { success: false, error: 'N8N_SECRET not configured' }
  }
  try {
    const res = await fetch(
      `${N8N_BASE_URL}/webhook/${slug}?key=${encodeURIComponent(N8N_SECRET)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    )
    if (!res.ok) {
      const text = await res.text()
      console.error(`[n8n] webhook ${slug} failed: ${res.status} ${text}`)
      return { success: false, error: `HTTP ${res.status}` }
    }
    return { success: true }
  } catch (err) {
    console.error(`[n8n] webhook ${slug} threw:`, err)
    return { success: false, error: String(err) }
  }
}

