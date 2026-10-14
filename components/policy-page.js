import Link from 'next/link';

export function PolicyPage({ eyebrow, title, updated, intro, sections }) {
  return <main id="main-content"><section className="page-hero"><div className="container"><p className="eyebrow">Policies / India</p><h1 className="display">{title}</h1><p className="lead">{intro}</p><p className="policy-updated">Last updated: {updated}</p></div></section><section className="section"><div className="container policy-layout"><aside className="policy-aside"><p className="eyebrow">{eyebrow}</p><p>These pages explain how Ethixweb India approaches privacy, service terms and cancellations. For a specific engagement, the signed agreement and applicable law apply.</p><Link className="card-link" href="/contact">Ask a policy question</Link></aside><div className="policy-sections">{sections.map(([heading, copy]) => <section className="policy-section" key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}</div></div></section></main>;
}
