'use client';

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0c0d10', color: '#f7f5f2', fontFamily: 'Arial, sans-serif' }}>
        <main style={{ width: 'min(720px, calc(100% - 2.2rem))' }}>
          <p style={{ color: '#ef5b60', fontSize: '.72rem', fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase' }}>Ethixweb / India</p>
          <h1 style={{ margin: '.7rem 0 0', fontSize: 'clamp(2.4rem, 7vw, 5.8rem)', lineHeight: .95, letterSpacing: '-.07em' }}>We hit a temporary snag.</h1>
          <p style={{ color: '#a9abb3', fontSize: '1.1rem', lineHeight: 1.6 }}>The page could not finish loading. Try again, or return to the homepage.</p>
          <button type="button" onClick={() => reset()} style={{ marginTop: '1rem', padding: '.85rem 1.2rem', border: 0, borderRadius: 999, color: '#fff', background: '#d13a40', fontWeight: 800, cursor: 'pointer' }}>Try again</button>
        </main>
      </body>
    </html>
  );
}
