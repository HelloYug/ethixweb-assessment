'use client';

import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

const approved = ['web', 'growth', 'ai', 'crm', 'data', 'accessibility', 'support'];

export function ContactPageClient({ service, industry }) {
  return <main id="main-content"><section className="page-hero"><div className="container"><p className="eyebrow">Contact / India</p><h1 className="display">Let’s make the next step <em>obvious.</em></h1><p className="lead">Tell us where the digital experience feels slower, more scattered or less clear than it should. We’ll start with the context, not a package.</p></div></section><section className="section"><div className="container split"><div><p className="eyebrow">What happens next</p><h2 style={{ fontSize: 'clamp(2rem,4vw,3.6rem)', lineHeight: 1, letterSpacing: '-.06em', margin: '.7rem 0 0' }}>A useful conversation in three steps.</h2><div className="journey"><div className="journey-item"><b>01</b><div><strong>You share the context</strong><span>Tell us what you are building and where the friction is.</span></div></div><div className="journey-item"><b>02</b><div><strong>We read the signal</strong><span>We review the request and identify the most useful starting point.</span></div></div><div className="journey-item"><b>03</b><div><strong>We shape the next move</strong><span>A focused follow-up, with a clear route into the work.</span></div></div></div><div className="card" style={{ marginTop: '2rem' }}><p className="card-index">India connection</p><h3>India-aware, globally grounded.</h3><p>Ethixweb India Private Limited brings local context to digital design, development, growth and support, with a focus on the details that change how customers decide.</p><Link className="card-link" href="/policies/privacy">Read the local privacy policy ↗</Link></div></div><ContactForm defaultService={approved.includes(service) ? service : ''} defaultContext={industry} /></div></section></main>;
}
