'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/icons';

export function MotionLayer() {
  const pathname = usePathname();
  const cursor = useRef(null);
  const follower = useRef(null);
  const trails = useRef([]);
  const sparkId = useRef(0);
  const sparkTimers = useRef(new Set());
  const labelRef = useRef('MOVE');
  const activeRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('MOVE');
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fine);
    if (!fine) return undefined;
    document.documentElement.classList.add('js-motion');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let fx = x;
    let fy = y;
    const trailPoints = Array.from({ length: 4 }, () => ({ x, y }));
    let raf;
    const cursorEl = cursor.current;
    const followerEl = follower.current;
    const render = () => {
      fx += (x - fx) * 0.32;
      fy += (y - fy) * 0.32;
      if (cursorEl) cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (followerEl) followerEl.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
      trailPoints.forEach((point, index) => {
        const lead = index === 0 ? { x: fx, y: fy } : trailPoints[index - 1];
        const trailEase = [0.24, 0.19, 0.15, 0.12][index];
        point.x += (lead.x - point.x) * trailEase;
        point.y += (lead.y - point.y) * trailEase;
        const trail = trails.current[index];
        if (trail) trail.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      });
      raf = requestAnimationFrame(render);
    };
    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!activeRef.current) { activeRef.current = true; setActive(true); }
      document.documentElement.style.setProperty('--pointer-x', `${x}px`);
      document.documentElement.style.setProperty('--pointer-y', `${y}px`);
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      if (target) {
        const nextLabel = target.getAttribute('data-cursor') || 'MOVE';
        if (nextLabel !== labelRef.current) { labelRef.current = nextLabel; setLabel(nextLabel); }
      }
    };
    const over = (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      if (target) {
        const nextLabel = target.getAttribute('data-cursor') || 'MOVE';
        if (nextLabel !== labelRef.current) { labelRef.current = nextLabel; setLabel(nextLabel); }
        followerEl?.classList.add('cursor-focus');
      }
    };
    const out = (event) => {
      const leaving = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      const entering = event.relatedTarget instanceof Element ? event.relatedTarget.closest('[data-cursor]') : null;
      if (leaving && !entering) followerEl?.classList.remove('cursor-focus');
    };
    const down = () => {
      followerEl?.classList.remove('cursor-pulse');
      requestAnimationFrame(() => followerEl?.classList.add('cursor-pulse'));
    };
    const spark = (event) => {
      const burst = { id: sparkId.current++, x: event.clientX, y: event.clientY };
      setSparks((current) => [...current.slice(-5), burst]);
      const timer = window.setTimeout(() => { sparkTimers.current.delete(timer); setSparks((current) => current.filter((item) => item.id !== burst.id)); }, 720);
      sparkTimers.current.add(timer);
    };
    const spotlightMove = (event) => {
      const target = event.target instanceof Element ? event.target.closest('.spotlight-card') : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      target.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };
    const spotlightOut = (event) => {
      const target = event.target instanceof Element ? event.target.closest('.spotlight-card') : null;
      const entering = event.relatedTarget instanceof Node ? event.relatedTarget : null;
      if (target && !target.contains(entering)) {
        target.style.setProperty('--spot-x', '50%');
        target.style.setProperty('--spot-y', '50%');
      }
    };
    const leave = () => { if (activeRef.current) { activeRef.current = false; setActive(false); } };

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerout', out, { passive: true });
    document.addEventListener('pointerdown', down, { passive: true });
    document.addEventListener('pointerdown', spark, { passive: true });
    document.addEventListener('pointermove', spotlightMove, { passive: true });
    document.addEventListener('pointerout', spotlightOut, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave, { passive: true });
    raf = requestAnimationFrame(render);

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element));

    const magneticMove = (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-magnetic]') : null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      target.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const magneticOut = (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-magnetic]') : null;
      if (target) target.style.transform = '';
    };
    document.addEventListener('pointermove', magneticMove, { passive: true });
    document.addEventListener('pointerout', magneticOut, { passive: true });

    return () => {
      document.documentElement.classList.remove('js-motion');
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerdown', spark);
      document.removeEventListener('pointermove', spotlightMove);
      document.removeEventListener('pointerout', spotlightOut);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointermove', magneticMove);
      document.removeEventListener('pointerout', magneticOut);
      document.documentElement.style.removeProperty('--pointer-x');
      document.documentElement.style.removeProperty('--pointer-y');
      sparkTimers.current.forEach((timer) => window.clearTimeout(timer));
      sparkTimers.current.clear();
    };
  }, []);

  return <>
    {enabled && <div className={`cursor-system${active ? ' is-active' : ''}`} aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => <span key={index} ref={(element) => { trails.current[index] = element; }} className={`cursor-trail cursor-trail-${index + 1}`} />)}
      <span ref={cursor} className="cursor-dot" />
      <span ref={follower} className="cursor-ring"><i className="cursor-orbit-a" /><i className="cursor-orbit-b" /><i className="cursor-crosshair" /><b>{label}</b></span>
    </div>}
    {enabled && sparks.map((spark) => <span className="click-spark" style={{ left: spark.x, top: spark.y }} key={spark.id} aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--spark-angle': `${index * 30}deg` }} />)}
    </span>)}
    <div className="ambient-glow" aria-hidden="true" />
    <div className="route-curtain" key={pathname} aria-hidden="true"><span /></div>
  </>;
}

const matrixItems = [
  { id: 'web', number: '01', label: 'Experience', title: 'A front door that feels unmistakably yours.', copy: 'Fast, expressive web systems for D2C, professional services, startups and regional businesses across India.', icon: 'code', accent: 'coral', href: '/services#web' },
  { id: 'growth', number: '02', label: 'Demand', title: 'Make discovery turn into momentum.', copy: 'Search, paid growth and measurement connected to the enquiry, sale or conversation that matters.', icon: 'chart', accent: 'amber', href: '/services#growth' },
  { id: 'ai', number: '03', label: 'Intelligence', title: 'Give every lead a faster next step.', copy: 'Practical AI and automation that help small teams respond with more context and less manual repetition.', icon: 'bot', accent: 'violet', href: '/services#ai' },
  { id: 'crm', number: '04', label: 'Operations', title: 'Keep the signal moving after the click.', copy: 'CRM, integrations and useful dashboards that connect customer context across the tools you already use.', icon: 'layers', accent: 'blue', href: '/services#data' },
];

const webSpokes = Array.from({ length: 12 }, (_, index) => index);
const webRings = [0.2, 0.38, 0.56, 0.74, 0.9];

function webPoint(spoke, radius) {
  const angle = (spoke / webSpokes.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(angle) * 46 * radius, y: 50 + Math.sin(angle) * 42 * radius };
}

function webRingPath(radius) {
  return `${webSpokes.map((spoke, index) => { const point = webPoint(spoke, radius); return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)},${point.y.toFixed(2)}`; }).join(' ')} Z`;
}

export function WebThreads() {
  const field = useRef(null);

  useEffect(() => {
    const element = field.current;
    if (!element) return undefined;
    const move = (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty('--web-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      element.style.setProperty('--web-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };
    element.addEventListener('pointermove', move, { passive: true });
    return () => element.removeEventListener('pointermove', move);
  }, []);

  return <div className="web-threads" ref={field} aria-hidden="true">
    <img className="spiderweb-asset" src="/brand/spiderweb.svg" alt="" draggable="false" />
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      {webSpokes.map((spoke) => { const point = webPoint(spoke, 1); return <path className="web-thread-spoke" d={`M50 50 L${point.x.toFixed(2)} ${point.y.toFixed(2)}`} key={`spoke-${spoke}`} style={{ '--thread-delay': `${spoke * -0.12}s` }} />; })}
      {webRings.map((radius, index) => <path className="web-thread-ring" d={webRingPath(radius)} key={`ring-${index}`} style={{ '--thread-delay': `${index * -0.35}s` }} />)}
      {webRings.slice(1).flatMap((radius, ringIndex) => webSpokes.filter((spoke) => spoke % 2 === ringIndex % 2).map((spoke) => { const point = webPoint(spoke, radius); return <circle className="web-thread-node" cx={point.x.toFixed(2)} cy={point.y.toFixed(2)} r="0.8" key={`node-${ringIndex}-${spoke}`} style={{ '--thread-delay': `${(ringIndex * 12 + spoke) * -0.14}s` }} />; }))}
      <circle className="web-thread-core" cx="50" cy="50" r="2.2" />
    </svg>
    <span className="web-thread-label label-a">WEB / FLOW</span>
    <span className="web-thread-label label-b">SIGNAL / 04.26</span>
  </div>;
}

export function SignalMatrix() {
  const [active, setActive] = useState(0);
  const item = matrixItems[active];
  return <div className="signal-matrix" data-accent={item.accent}>
    <div className="matrix-rail" role="tablist" aria-label="Ethixweb system layers">
      {matrixItems.map((entry, index) => <button data-cursor="SWITCH" className={`matrix-tab${index === active ? ' active' : ''}`} type="button" role="tab" aria-selected={index === active} key={entry.id} onClick={() => setActive(index)}>
        <span className="matrix-tab-number">{entry.number}</span><Icon name={entry.icon} size={19} /><span>{entry.label}</span><i aria-hidden="true">↗</i>
      </button>)}
    </div>
    <div className="matrix-display" key={item.id}>
      <div className="matrix-grid" aria-hidden="true" /><div className="matrix-orbit orbit-a" aria-hidden="true" /><div className="matrix-orbit orbit-b" aria-hidden="true" />
      <span className="matrix-kicker">SYSTEM LAYER / {item.number}</span><Icon name={item.icon} size={26} className="matrix-icon" />
      <h3>{item.title}</h3><p>{item.copy}</p><Link href={item.href} data-cursor="OPEN" className="matrix-link">Explore {item.label}<Icon name="arrowUpRight" size={16} /></Link>
      <div className="matrix-readout"><span>INDIA / 2026</span><span>0{active + 1} / 04</span><span className="readout-pulse"><i /> live system</span></div>
    </div>
  </div>;
}

