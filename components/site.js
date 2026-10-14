'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/icons';
import { WebThreads } from '@/components/animations';

const navItems = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/industries', 'Industries'],
  ['/our-work', 'Work'],
  ['/about', 'About'],
  ['/insights', 'Insights'],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
    <header className="site-header">
      <div className={`header-shell${scrolled ? ' scrolled' : ''}`}>
        <Link className="brand" href="/" aria-label="Ethixweb India home" onClick={() => setOpen(false)}>
          <Image src="/brand/ethixweb-logo.webp" alt="Ethixweb" width={214} height={32} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([href, label]) => <Link key={href} className="nav-link" href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="button button-primary desktop-nav" data-cursor="START" data-magnetic href="/contact">Start a project <Icon name="arrowUpRight" size={16} /></Link>
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
        {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([href, label]) => <Link key={href} data-cursor="OPEN" href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}<Icon name="arrowUpRight" size={14} /></Link>)}<Link className="button button-primary" data-cursor="START" href="/contact" onClick={() => setOpen(false)}>Start a project <Icon name="arrowUpRight" size={16} /></Link></nav>}
      </div>
    </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand"><Image src="/brand/ethixweb-logo.webp" alt="Ethixweb" width={214} height={32} /><p>Global expertise, grounded in Indian ambition. Websites, growth systems and automation for teams ready to move with clarity.</p></div>
          <div><p className="footer-title">Explore</p><ul className="footer-links"><li><Link href="/">Home</Link></li><li><Link href="/services">Services</Link></li><li><Link href="/industries">Industries</Link></li><li><Link href="/our-work">Our Work</Link></li><li><Link href="/about">About</Link></li><li><Link href="/insights">Insights</Link></li></ul></div>
          <div><p className="footer-title">Capability paths</p><ul className="footer-links"><li><Link href="/web-development">Website design</Link></li><li><Link href="/ai-automation">AI & automation</Link></li><li><Link href="/marketing">Social growth</Link></li><li><Link href="/services#growth">SEO & local discovery</Link></li><li><Link href="/services#data">CRM & analytics</Link></li></ul></div>
          <div><p className="footer-title">Source & contact</p><ul className="footer-links"><li><Link href="/policies/privacy">Privacy policy</Link></li><li><Link href="/policies/terms">Terms & conditions</Link></li><li><Link href="/policies/refunds">Cancellation & refunds</Link></li><li><Link href="/">Ethixweb India home</Link></li><li><a href="mailto:info@ethixweb.com">info@ethixweb.com</a></li></ul></div>
        </div>
         <div className="footer-bottom"><span>© {new Date().getFullYear()} Ethixweb India</span><span>Digital systems for ambitious businesses.</span></div>
      </div>
    </footer>
  );
}

export function NetworkVisual() {
  const [activeNode, setActiveNode] = useState('system');
  useEffect(() => {
    const sequence = ['system', 'website', 'enquiry', 'crm', 'growth'];
    const timer = window.setInterval(() => setActiveNode((current) => sequence[(sequence.indexOf(current) + 1) % sequence.length]), 4800);
    return () => window.clearInterval(timer);
  }, []);
  return <div className="network-frame" aria-label="A connected growth system diagram">
    <WebThreads />
    <div className="signal-particles" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ '--particle-index': index }} />)}</div>
    <div className="network-sweep" aria-hidden="true" />
    <div className="network-orbit orbit-one" aria-hidden="true" />
    <div className="network-orbit orbit-two" aria-hidden="true" />
    <svg className="network-lines" viewBox="0 0 1234 772" aria-hidden="true" preserveAspectRatio="none">
      <path className="network-connector connector-web" d="M682 353 C600 282 520 180 470 68" />
      <path className="network-connector connector-enquiry" d="M682 353 C760 270 850 170 932 67" />
      <path className="network-connector connector-crm" d="M682 353 C610 390 500 420 405 443" />
      <path className="network-connector connector-growth" d="M682 353 C780 390 875 420 961 447" />
      <path className="network-connector connector-design" d="M682 353 C650 485 570 610 504 692" />
      <circle cx="682" cy="353" r="5" /><circle className="signal-pulse pulse-a" cx="682" cy="353" r="4" /><circle className="signal-pulse pulse-b" cx="682" cy="353" r="4" />
    </svg>
    <button type="button" data-cursor="FOCUS" className="network-core" aria-label="Connected system, India live" onClick={() => setActiveNode('system')}><div className="network-core-mark"><Image src="/brand/emblem.webp" alt="" width={58} height={58} /></div></button>
    <button type="button" data-cursor="INSPECT" className={`node node-web${activeNode === 'website' ? ' is-active' : ''}`} onMouseEnter={() => setActiveNode('website')} onFocus={() => setActiveNode('website')} onClick={() => setActiveNode('website')}><span className="node-icon"><Icon name="phone" size={17} /></span><strong>More booked jobs</strong></button>
    <button type="button" data-cursor="INSPECT" className={`node node-enquiry${activeNode === 'enquiry' ? ' is-active' : ''}`} onMouseEnter={() => setActiveNode('enquiry')} onFocus={() => setActiveNode('enquiry')} onClick={() => setActiveNode('enquiry')}><span className="node-icon"><Icon name="trend" size={17} /></span><strong>More conversions</strong></button>
    <button type="button" data-cursor="INSPECT" className={`node node-crm${activeNode === 'crm' ? ' is-active' : ''}`} onMouseEnter={() => setActiveNode('crm')} onFocus={() => setActiveNode('crm')} onClick={() => setActiveNode('crm')}><span className="node-icon"><Icon name="layers" size={17} /></span><strong>UI/UX Systems</strong></button>
    <button type="button" data-cursor="INSPECT" className={`node node-growth${activeNode === 'growth' ? ' is-active' : ''}`} onMouseEnter={() => setActiveNode('growth')} onFocus={() => setActiveNode('growth')} onClick={() => setActiveNode('growth')}><span className="node-icon"><Icon name="dollar" size={17} /></span><strong>Revenue tracked</strong></button>
    <div className="node node-design" aria-hidden="true"><span className="node-icon"><Icon name="palette" size={17} /></span><strong>Design that converts</strong></div>
  </div>;
}

export function ArrowLink({ href, children, className = '' }) { return <Link className={`card-link ${className}`} href={href}>{children}</Link>; }

export function SignalMarquee() {
  const items = ['WEB SYSTEMS', 'AI AUTOMATION', 'DIGITAL GROWTH', 'CRM', 'INTELLIGENCE', 'ANALYTICS'];
  return <div className="signal-marquee" aria-label="Ethixweb capabilities">
    <div className="signal-marquee-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}><i aria-hidden="true"><Icon name="spark" size={13} /></i>{item}</span>)}</div>
  </div>;
}

