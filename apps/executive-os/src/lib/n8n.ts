const N8N_BASE_URL = process.env.N8N_BASE_URL ?? 'https://n8n.maxpromo.digital'
const N8N_SECRET   = process.env.N8N_SECRET   ?? 'mcp-bridge-secret-2024-maxpromo'

export async function triggerN8nWorkflow(
  slug: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
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
