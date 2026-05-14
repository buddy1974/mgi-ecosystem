'use client';

import { useState } from 'react';
import { PROGRAMS } from '@/lib/programs';

interface Props {
  program: string;
  source?: string | null;
}

export default function RegisterButton({ program, source }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = PROGRAMS[program];

  async function handleClick() {
    if (!config) return;
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create registration record
      const regRes = await fetch('/api/registration/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ program, source: source ?? null }),
      });
      if (regRes.ok) {
        const data = await regRes.json();
        if (data.reference) {
          sessionStorage.setItem('rogers_registration_ref', data.reference);
        }
      }

      // Step 2: Try dynamic PayUnit initiate for proper return_url
      const initRes = await fetch('/api/payunit/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          program,
          programName: config.name,
          amount: config.amount,
        }),
      });

      if (initRes.ok) {
        const { checkoutUrl } = await initRes.json();
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
          return;
        }
      }

      // Fallback: open pre-created PayUnit link
      window.location.href = config.payunitLink;
    } catch {
      // Last resort: direct link
      window.location.href = config.payunitLink;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        style={{
          background: loading ? 'rgba(58,12,163,0.5)' : '#3a0ca3',
          color: '#fff',
          border: 'none',
          padding: '18px 56px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#f72585'; }}
        onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#3a0ca3'; }}
      >
        {loading ? 'Preparing...' : 'Register & Pay'}
      </button>
      {error && (
        <p style={{ color: '#f72585', fontSize: 13, margin: 0 }}>{error}</p>
      )}
    </div>
  );
}
