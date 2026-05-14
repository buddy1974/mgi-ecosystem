'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RegisteredPage() {
  const [reference, setReference] = useState<string | null>(null);
  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "'Segoe UI', system-ui, sans-serif";

  useEffect(() => {
    const ref = sessionStorage.getItem('rogers_registration_ref');
    if (ref) setReference(ref);
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#06010f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', fontFamily: sans }}>
      {/* Success icon */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(58,12,163,0.2)', border: '2px solid rgba(58,12,163,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, marginBottom: 32,
      }}>
        ✓
      </div>

      <p style={{ color: '#f72585', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>
        Registration Confirmed
      </p>

      <h1 style={{
        color: '#ffffff', fontFamily: serif,
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 400, letterSpacing: '0.02em',
        textAlign: 'center', marginBottom: 20,
        maxWidth: 600,
      }}>
        You&apos;re registered!
      </h1>

      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.75, textAlign: 'center', maxWidth: 520, marginBottom: 36 }}>
        Thank you for registering. Your place is reserved. Complete your payment below to confirm your seat.
      </p>

      {reference && (
        <div style={{
          background: 'rgba(58,12,163,0.15)',
          border: '1px solid rgba(58,12,163,0.4)',
          borderRadius: 8,
          padding: '12px 32px',
          marginBottom: 36,
          textAlign: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>Your Reference</p>
          <p style={{ color: '#7b90f3', fontFamily: 'monospace', fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: '0.1em' }}>{reference}</p>
        </div>
      )}

      {/* Payment instructions */}
      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.9, textAlign: 'center', maxWidth: 480, marginBottom: 40 }}>
        <p style={{ marginBottom: 8 }}>Payment via MTN MoMo or Orange Money:</p>
        <p style={{ marginBottom: 4 }}>MTN: <strong style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'monospace' }}>*126*4*926667*AMOUNT#</strong></p>
        <p style={{ marginBottom: 16 }}>Orange: <strong style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'monospace' }}>#150*47*890422*AMOUNT#</strong></p>
        <p>Send payment proof to WhatsApp: <a href="https://wa.me/237683493220" style={{ color: '#f72585', textDecoration: 'none' }}>+237 683 493 220</a></p>
        {reference && <p style={{ marginTop: 8, fontSize: 12 }}>Include your reference <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{reference}</strong> in your message.</p>}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/programs/dominion-life" style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.75)', padding: '14px 32px',
          borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: 'none',
        }}>
          ← Back to Programs
        </Link>
        <a href="https://wa.me/237683493220" target="_blank" rel="noopener noreferrer" style={{
          background: '#3a0ca3', color: 'white',
          padding: '14px 32px', borderRadius: 10,
          fontSize: 13, fontWeight: 700, textDecoration: 'none',
        }}>
          Send Proof on WhatsApp
        </a>
      </div>
    </main>
  );
}
