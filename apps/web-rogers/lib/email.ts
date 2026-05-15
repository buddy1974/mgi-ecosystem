const RESEND_API = 'https://api.resend.com/emails'
const FROM_NAME  = 'Rogers Nforgwei'
const FROM_ADDR  = 'no-reply@rogersnforgwei.com'
const ADMIN_TO   = 'info@rogersnforgwei.com'

interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<void> {
  const key = process.env.RESEND_API_KEY
  if (!key) return

  try {
    await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_ADDR}>`,
        to,
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })
  } catch {
    // Fire-and-forget — never block the caller
  }
}

// ─── Registration confirmation → applicant ──────────────────────────────────

export function sendRegistrationConfirmation(params: {
  to: string
  name: string
  program: string
  reference: string
}): void {
  const { to, name, program, reference } = params

  void sendEmail({
    to,
    subject: `Your registration is confirmed — ${program}`,
    html: `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0d0120;font-family:'Segoe UI',system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:48px 16px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#120230;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.10);">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#3a0ca3,#7209b7);padding:36px 40px;text-align:center;">
    <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.4em;text-transform:uppercase;margin:0 0 12px;">Registration Confirmed</p>
    <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:0;letter-spacing:-0.02em;">Your seat is reserved.</h1>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:36px 40px;">
    <p style="color:rgba(255,255,255,0.80);font-size:16px;line-height:1.75;margin:0 0 24px;">
      Hi ${name},<br><br>
      Welcome. Your registration for <strong style="color:#f72585;">${program}</strong> has been received and your seat is reserved.
    </p>

    <!-- Reference badge -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:10px;margin-bottom:28px;">
      <tr><td style="padding:20px;text-align:center;">
        <p style="color:rgba(255,255,255,0.45);font-size:10px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px;">Your Reference Number</p>
        <p style="color:#ffffff;font-family:monospace;font-size:22px;font-weight:700;margin:0;letter-spacing:0.12em;">${reference}</p>
      </td></tr>
    </table>

    <!-- Payment instructions -->
    <p style="color:rgba(255,255,255,0.65);font-size:14px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">Complete your payment</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;">
        <p style="color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 8px;">MTN Mobile Money</p>
        <p style="color:#ffffff;font-family:monospace;font-size:14px;margin:0 0 20px;">*126*4*926667*AMOUNT#</p>
        <p style="color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 8px;">Orange Money</p>
        <p style="color:#ffffff;font-family:monospace;font-size:14px;margin:0;">#150*47*890422*AMOUNT#</p>
      </td></tr>
    </table>

    <p style="color:rgba(255,255,255,0.65);font-size:15px;line-height:1.75;margin:0 0 28px;">
      After payment, send your proof to WhatsApp and include your reference <strong style="color:#f72585;">${reference}</strong> in the message.
    </p>

    <!-- WhatsApp CTA -->
    <table cellpadding="0" cellspacing="0"><tr><td>
      <a href="https://wa.me/237683493220?text=${encodeURIComponent(`Hi, I just paid for ${program}. My reference is ${reference}. Here is my proof of payment.`)}"
        style="display:inline-block;background:linear-gradient(135deg,#f72585,#7209b7);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:999px;letter-spacing:0.02em;">
        Send Payment Proof on WhatsApp →
      </a>
    </td></tr></table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
    <p style="color:rgba(255,255,255,0.30);font-size:12px;margin:0;">Rogers Ngalla Nforgwei · Yaoundé, Cameroon · rogersnforgwei.com</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>
    `.trim(),
  })
}

// ─── Payment confirmed → admin ──────────────────────────────────────────────

export function sendPaymentNotificationToAdmin(params: {
  program: string
  amount: number
  reference: string
  registrantName: string | null
  registrantEmail: string | null
  registrantPhone: string | null
  transactionId: string | null
}): void {
  const { program, amount, reference, registrantName, registrantEmail, registrantPhone, transactionId } = params

  const date = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Douala',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  void sendEmail({
    to: ADMIN_TO,
    subject: `✅ Payment Confirmed — ${program} — ${reference}`,
    html: `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f8;font-family:'Segoe UI',system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px;">
<table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0e0ef;">
  <tr><td style="background:#3a0ca3;padding:28px 32px;">
    <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px;">Rogers Nforgwei Programs</p>
    <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">Payment Confirmed</h1>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;width:140px;">Program</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;font-weight:600;">${program}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Reference</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#3a0ca3;font-family:monospace;font-size:14px;font-weight:700;">${reference}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Amount</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;font-weight:600;">${amount.toLocaleString()} XAF</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;">${registrantName ?? '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;">${registrantEmail ?? '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;">${registrantPhone ?? '—'}</td></tr>
      ${transactionId ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">PayUnit ID</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-family:monospace;font-size:12px;">${transactionId}</td></tr>` : ''}
      <tr><td style="padding:10px 0;color:#666;font-size:13px;">Date</td><td style="padding:10px 0;color:#1a1a2e;font-size:13px;">${date}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 32px;background:#f8f8fd;border-top:1px solid #e0e0ef;">
    <p style="color:#999;font-size:12px;margin:0;text-align:center;">Rogers Nforgwei Programs · Auto-notification</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>
    `.trim(),
  })
}

// ─── Contact inquiry → admin ─────────────────────────────────────────────────

export function sendContactInquiryToAdmin(params: {
  name: string
  email: string
  phone: string
  type: string
  message: string
}): void {
  const { name, email, phone, type, message } = params

  const typeLabel: Record<string, string> = {
    general: 'General Question',
    speaking: 'Speaking Inquiry',
    media: 'Media / Press',
    other: 'Other',
  }

  void sendEmail({
    to: ADMIN_TO,
    replyTo: email,
    subject: `New Inquiry — ${typeLabel[type] ?? type} — ${name}`,
    html: `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f4f4f8;font-family:'Segoe UI',system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px;">
<table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0e0ef;">
  <tr><td style="background:#4361ee;padding:28px 32px;">
    <p style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px;">Contact Inquiry</p>
    <h1 style="color:#ffffff;font-size:20px;font-weight:700;margin:0;">${typeLabel[type] ?? type} from ${name}</h1>
  </td></tr>
  <tr><td style="padding:28px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;width:100px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;font-weight:600;">${name}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#4361ee;font-size:13px;"><a href="mailto:${email}" style="color:#4361ee;">${email}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;">${phone || '—'}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#666;font-size:13px;">Type</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f5;color:#1a1a2e;font-size:13px;">${typeLabel[type] ?? type}</td></tr>
    </table>
    <div style="margin-top:24px;padding:20px;background:#f8f8fd;border-radius:8px;border-left:3px solid #4361ee;">
      <p style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 10px;">Message</p>
      <p style="color:#1a1a2e;font-size:14px;line-height:1.75;margin:0;white-space:pre-wrap;">${message}</p>
    </div>
    <p style="color:#999;font-size:12px;margin:24px 0 0;">Reply directly to this email to respond to ${name}.</p>
  </td></tr>
  <tr><td style="padding:20px 32px;background:#f8f8fd;border-top:1px solid #e0e0ef;">
    <p style="color:#999;font-size:12px;margin:0;text-align:center;">Rogers Nforgwei · Contact Form · rogersnforgwei.com</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>
    `.trim(),
  })
}
