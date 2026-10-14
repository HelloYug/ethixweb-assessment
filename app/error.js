'use client';

import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <main id="main-content" className="error-page">
      <div className="container error-panel">
        <p className="eyebrow">Ethixweb / India</p>
        <h1>We hit a temporary snag.</h1>
        <p className="lead">The page could not finish loading. Try again, or return to the homepage.</p>
        <div className="hero-actions">
          <button className="button button-primary" type="button" onClick={() => reset()}>Try again <span aria-hidden="true">↗</span></button>
          <Link className="button button-secondary" href="/">Go home <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  );
}
