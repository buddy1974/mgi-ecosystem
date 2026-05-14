import { NextRequest, NextResponse } from 'next/server';

const PAYUNIT_BASE = 'https://gateway.payunit.net';

function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://rogersnforgwei.com';
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const apiKey = process.env.PAYUNIT_API_KEY;
    if (!apiKey) {
      console.error('[payunit/initiate] PAYUNIT_API_KEY is not set');
      return NextResponse.json(
        { error: 'Payment gateway is being activated. Use the manual payment option below.' },
        { status: 503 }
      );
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'mode': 'test',
    };

    const apiUser = process.env.PAYUNIT_API_USER;
    const apiPass = process.env.PAYUNIT_API_PASSWORD;
    if (apiUser && apiPass) {
      headers['Authorization'] = `Basic ${Buffer.from(`${apiUser}:${apiPass}`).toString('base64')}`;
    }

    const transactionId = `RN${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const base = siteUrl();

    const amount = data.amount ?? 50000;

    const payunitRes = await fetch(`${PAYUNIT_BASE}/api/gateway/initialize`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        total_amount: amount,
        currency: 'XAF',
        transaction_id: transactionId,
        return_url: `${base}/registered`,
        notify_url: `${base}/api/payunit/webhook`,
        payment_country: 'CM',
        name: data.programName ?? data.program ?? 'Rogers Program',
      }),
    });

    if (!payunitRes.ok) {
      const text = await payunitRes.text();
      console.error('[payunit/initiate] PayUnit error:', payunitRes.status, text);
      return NextResponse.json(
        { error: 'Payment gateway is being activated. Use the manual payment option below.' },
        { status: 502 }
      );
    }

    const json = await payunitRes.json();
    const checkoutUrl: string | undefined = json?.transaction_url;

    if (!checkoutUrl) {
      console.error('[payunit/initiate] Missing transaction_url:', json);
      return NextResponse.json(
        { error: 'Payment gateway is being activated. Use the manual payment option below.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error('[payunit/initiate]', err);
    return NextResponse.json(
      { error: 'Payment gateway is being activated. Use the manual payment option below.' },
      { status: 500 }
    );
  }
}
