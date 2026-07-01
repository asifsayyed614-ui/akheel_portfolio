import { useState, useEffect, useRef } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas.jsx';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Education', 'Certificates', 'Contact'];

const SKILLS = [
  { name: 'Matlab Simulink', level: 'Basic', percent: 40, cat: 'simulation', icon: '📊' },
  { name: 'Python', level: 'Basic', percent: 38, cat: 'programming', icon: '🐍' },
  { name: 'AutoCAD', level: 'Basic', percent: 42, cat: 'design', icon: '📐' },
  { name: 'MS Word', level: 'Basic', percent: 55, cat: 'productivity', icon: '📝' },
  { name: 'VLSI Design', level: 'Basic', percent: 35, cat: 'hardware', icon: '🔬' },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Automated Wireless Charging with Indian Billing Parking Slots',
    status: 'In Progress',
    type: 'plasma',
    emoji: '⚡',
    featured: true,
    description: 'Developing a real-life smart parking system that integrates wireless EV charging pads with automated Indian billing infrastructure. The system detects vehicle presence, initiates contactless charging via inductive coils, and generates dynamic billing based on energy consumed — designed around Indian parking standards and UPI-based payment integration.',
    tags: ['Wireless Power Transfer', 'IoT', 'EV Charging', 'Embedded Systems', 'UPI Billing'],
    phases: [
      {
        number: '01',
        title: 'Phase 1: Vehicle Alignment & Coil Resonance Coupling',
        status: 'Completed',
        desc: 'Detects the vehicle using ultrasonic/IR sensors as it enters the parking slot, activates the high-frequency transmitter coil embedded in the ground, and achieves magnetic resonance coupling with the vehicle\'s receiver coil for efficient, touchless power transfer.'
      },
      {
        number: '02',
        title: 'Phase 2: Automated Energy Monitoring & UPI Billing',
        status: 'In Progress',
        desc: 'Monitors current and voltage in real-time to calculate cumulative energy consumption. Upon charge completion or vehicle departure, the system generates a dynamic UPI QR code displayed on a local screen or app for automated billing and touchless checkout.'
      }
    ],
    features: [
      'High-frequency magnetic resonance wireless charging pads',
      'Intelligent vehicle presence and positioning detection sensors',
      'Real-time power monitoring and energy calculation algorithms',
      'Dynamic UPI QR code generation and direct payment gateway integration',
      'Fail-safe thermal and overcurrent safety cutoff protections'
    ]
  },
  {
    id: 2,
    title: 'Automatic Touchless Water Tap',
    status: 'Completed',
    type: 'volt',
    emoji: '💧',
    featured: false,
    description: 'Built a mini project for an automatic touchless water tap using IR proximity sensors without Arduino — demonstrating pure analog/digital circuit design with discrete components, enabling hygienic contactless flow control.',
    tags: ['IR Sensors', 'Analog Circuits', 'Embedded Design', 'PCB Layout'],
    phases: [
      {
        number: '01',
        title: 'Phase 1: Hand Proximity Detection',
        status: 'Completed',
        desc: 'Emits and detects infrared light reflections to sense when a user\'s hands are near the faucet nozzle, changing the analog sensor output voltage.'
      },
      {
        number: '02',
        title: 'Phase 2: Valve Actuation & Automatic Cutoff',
        status: 'Completed',
        desc: 'Uses discrete transistor switches to drive a solenoid valve, letting water flow for the duration of hand detection without requiring any programming or microcontroller.'
      }
    ],
    features: [
      'Pure analog/digital circuit design operating without microcontrollers',
      'Highly sensitive IR transmitter-receiver pair with adjustable range',
      '5V/12V DC solenoid valve integration with flyback diode protection',
      'Low power consumption in standby mode for long-lasting operation'
    ]
  },
  {
    id: 3,
    title: 'Light Detector with Automatic Control',
    status: 'Completed',
    type: 'volt',
    emoji: '🔆',
    featured: false,
    description: 'Designed a light-sensing circuit using an LDR (Light Dependent Resistor) and IC 741 op-amp comparator to automatically trigger loads based on ambient light intensity — applicable for street lights and energy-saving automation.',
    tags: ['LDR Sensor', 'IC 741 Op-Amp', 'Comparator Circuit', 'Power Electronics'],
    phases: [
      {
        number: '01',
        title: 'Phase 1: Ambient Light Measurement',
        status: 'Completed',
        desc: 'Utilizes a Light Dependent Resistor (LDR) to convert ambient light intensity into an electrical resistance value, forming a voltage divider input.'
      },
      {
        number: '02',
        title: 'Phase 2: IC 741 Comparator & Load Switching',
        status: 'Completed',
        desc: 'An IC 741 Operational Amplifier compares the input voltage against a predefined threshold, outputting a signal to trigger a transistor-driven electromagnetic relay.'
      }
    ],
    features: [
      'Industrial-standard IC 741 Op-Amp comparator configuration',
      'Adjustable threshold calibration potentiometer for fine tuning sensitivity',
      '10A relay output support to switch AC loads (street lights, domestic lights)',
      'Noise filtering components to prevent false triggering from transient light changes'
    ]
  }
];

const EDUCATION = [
  { year: '2021', degree: 'Secondary Education (SSLC)', institution: 'Makkala Mantapa English Medium School', grade: '51.43%', icon: '🏫' },
  { year: '2024', degree: 'Diploma in Electrical & Electronics Engineering', institution: 'Sanjay Gandhi Polytechnic', grade: '9.00', icon: '⚙️' },
  { year: 'Pursuing', degree: 'B.E. — Electrical & Electronics Engineering', institution: 'Kishkinda University', grade: '7.12', icon: '🎓' },
];

const CERTIFICATES = [
  {
    title: 'AI For All — AI Aware Stage',
    issuer: 'Intel & Digital India',
    date: 'Jan 18, 2026',
    accent: '#0071C5',
    bg: 'rgba(0,113,197,0.08)',
    previewBg: '#0A3A6B',
    previewText: '#C8E0F4',
    tags: ['AI Awareness', 'Digital Literacy'],
    description: 'Participated in the AI For All program by Intel & Digital India and completed the AI Aware stage — building foundational understanding of Artificial Intelligence.',
  },
  {
    title: 'AI Fluency for Students',
    issuer: 'Anthropic',
    date: '2025',
    accent: '#9B8EC4',
    bg: 'rgba(155,142,196,0.08)',
    previewBg: '#B8B0D4',
    previewText: '#1A1530',
    tags: ['AI Fluency', 'LLMs', 'Responsible AI'],
    description: 'Completed the AI Fluency for Students course by Anthropic — covering practical understanding of large language models and their responsible use.',
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    date: '2025',
    accent: '#6B8F5E',
    bg: 'rgba(107,143,94,0.08)',
    previewBg: '#4A6B3E',
    previewText: '#D4E8CE',
    tags: ['AI Framework', 'Foundations', 'AI Literacy'],
    description: 'Completed the AI Fluency: Framework & Foundations course by Anthropic — establishing a structured understanding of AI concepts and frameworks.',
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic',
    date: '2025',
    accent: '#C4B49A',
    bg: 'rgba(196,180,154,0.08)',
    previewBg: '#D4C8B4',
    previewText: '#2A2218',
    tags: ['Claude', 'Prompt Engineering', 'AI Tools'],
    description: 'Completed Claude 101 by Anthropic — an introductory course on working effectively with Claude AI for various tasks and applications.',
  },
  {
    title: 'AI Fluency for Educators',
    issuer: 'Anthropic',
    date: '2025',
    accent: '#7AADA0',
    bg: 'rgba(122,173,160,0.08)',
    previewBg: '#5A8D80',
    previewText: '#D4EDE8',
    tags: ['AI in Education', 'Teaching', 'AI Fluency'],
    description: 'Completed AI Fluency for Educators by Anthropic — focused on integrating AI literacy into educational contexts and teaching AI concepts effectively.',
  },
  {
    title: 'Teaching the AI Fluency Framework',
    issuer: 'Anthropic',
    date: '2025',
    accent: '#5B8DB8',
    bg: 'rgba(91,141,184,0.08)',
    previewBg: '#3A6A9E',
    previewText: '#C8DCF0',
    tags: ['AI Framework', 'Pedagogy', 'Curriculum'],
    description: 'Completed Teaching the AI Fluency Framework by Anthropic — equipping educators with tools to teach the AI fluency framework in academic settings.',
  },
  {
    title: 'MATLAB Onramp',
    issuer: 'MathWorks',
    date: 'Dec 28, 2025',
    accent: '#E8A020',
    bg: 'rgba(232,160,32,0.08)',
    previewBg: '#0A3A6B',
    previewText: '#C8E0F4',
    tags: ['MATLAB', 'Simulation', 'Data Analysis'],
    description: 'Successfully completed 100% of the MATLAB Onramp self-paced training course by MathWorks — covering MATLAB fundamentals, programming, and data workflows.',
  },
];

const ACHIEVEMENTS = [
  { icon: '🥇', text: 'First prize in Mini Project Competition' },
  { icon: '🏃', text: '1st prize in 100m Running Race' },
  { icon: '🏸', text: 'District Level Badminton Champion' },
];

function useVisible() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Section({ id, children, className = '', style = {} }) {
  const [ref, vis] = useVisible();
  return (
    <section id={id} ref={ref} className={`section-enter ${vis ? 'visible' : ''} ${className}`} style={style}>
      {children}
    </section>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-14 text-center">
      <div className="lightning-divider mb-3">
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'white', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {children}
        </span>
      </div>
      {sub && <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: '#E8FF00', opacity: 0.6, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{sub}</p>}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(232,255,0,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#E8FF00', fontSize: '0.95rem', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(232,255,0,0.7)' }}>
          KK.AKHEEL<span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>_EEE</span>
        </div>
        <div style={{ display: 'flex', gap: '32px' }} className="hidden md:flex">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => go(link)}
              className="nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s', fontWeight: 500 }}
              onMouseEnter={e => e.target.style.color = '#E8FF00'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >
              {link}
            </button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E8FF00', display: 'none' }} className="block md:hidden">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="13" x2="20" y2="13" /><line x1="4" y1="19" x2="20" y2="19" /></>
            }
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: 'rgba(10,10,15,0.97)', borderTop: '1px solid rgba(232,255,0,0.1)', padding: '16px 24px' }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => go(link)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', padding: '10px 0', fontWeight: 500 }}>
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '80px' }} className="circuit-bg">
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '30%', left: '20%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(232,255,0,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '30%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(0,229,255,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Corner accents */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{
          position: 'absolute', width: '60px', height: '60px',
          ...(i === 0 ? { top: '80px', left: '24px', borderTop: '2px solid rgba(232,255,0,0.35)', borderLeft: '2px solid rgba(232,255,0,0.35)' }
            : i === 1 ? { top: '80px', right: '24px', borderTop: '2px solid rgba(232,255,0,0.35)', borderRight: '2px solid rgba(232,255,0,0.35)' }
              : i === 2 ? { bottom: '24px', left: '24px', borderBottom: '2px solid rgba(232,255,0,0.35)', borderLeft: '2px solid rgba(232,255,0,0.35)' }
                : { bottom: '24px', right: '24px', borderBottom: '2px solid rgba(232,255,0,0.35)', borderRight: '2px solid rgba(232,255,0,0.35)' })
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Avatar */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
          <div style={{ width: '148px', height: '148px', borderRadius: '50%', border: '2px solid rgba(232,255,0,0.6)', boxShadow: '0 0 30px rgba(232,255,0,0.4), 0 0 60px rgba(232,255,0,0.15)', margin: '0 auto', overflow: 'hidden', background: '#111' }}>
            <img src="/photo.png" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', background: 'rgba(15,15,26,0.75)', border: '1px solid rgba(232,255,0,0.4)', padding: '2px 8px', borderRadius: '3px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#E8FF00' }}>● ONLINE</span>
          </div>
        </div>

        <div className="animate-flicker" style={{ fontFamily: 'Share Tech Mono', color: '#E8FF00', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px' }}>
          &gt; Initializing Portfolio...
        </div>

        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', color: 'white', lineHeight: 1.1, marginBottom: '8px' }}>
          Mohammed
          <span style={{ display: 'block', color: '#E8FF00', textShadow: '0 0 30px rgba(232,255,0,0.7)' }}>Akheel</span>
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
          {['EEE Student', ' placement Student Coordinator', 'Circuit Designer', 'Project Builder'].map((t, i) => (
            <span key={t} className={i % 2 === 0 ? 'plasma-tag' : 'tag'}>{t}</span>
          ))}
        </div>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto 40px', lineHeight: 1.8 }}>
          Electrical & Electronics Engineering student at Kishkinda University — passionate about power systems, embedded electronics, and building real-world solutions. Currently leading projects in wireless EV charging and smart infrastructure.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '64px' }}>
          <a
            href="https://www.linkedin.com/in/kk-mohammed-akheel-13609a333/"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '12px 32px', background: '#E8FF00', color: '#0A0A0F', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(232,255,0,0.4)', transition: 'background 0.2s', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={e => e.currentTarget.style.background = '#FFB400'}
            onMouseLeave={e => e.currentTarget.style.background = '#E8FF00'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            LinkedIn
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '12px 32px', background: 'transparent', color: '#E8FF00', border: '1px solid rgba(232,255,0,0.5)', cursor: 'pointer', transition: 'background 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,255,0,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            Contact Me
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0', maxWidth: '380px', margin: '0 auto', border: '1px solid rgba(232,255,0,0.12)', background: 'rgba(15,15,26,0.7)', padding: '20px' }}>
          {[['9.00', 'Diploma GPA'], ['3+', 'Projects'], ['6+', 'Certifications']].map(([v, l], i) => (
            <div key={l} style={{ textAlign: 'center', padding: '0 16px', borderRight: i < 2 ? '1px solid rgba(232,255,0,0.1)' : 'none' }}>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '1.6rem', color: '#E8FF00' }}>{v}</div>
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, delay }) {
  const [ref, vis] = useVisible();
  return (
    <div ref={ref} className="card-hover" style={{ background: 'rgba(15,15,26,0.75)', padding: '20px', animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>{skill.icon}</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'white', fontWeight: 600, letterSpacing: '-0.01em' }}>{skill.name}</span>
          <span style={{ fontFamily: 'Share Tech Mono', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>[{skill.cat}]</span>
        </div>
        <span className="tag">{skill.level}</span>
      </div>
      <div style={{ height: '8px', background: '#2A2A3E', borderRadius: '2px', overflow: 'hidden' }}>
        <div className="skill-bar" style={{ height: '100%', background: 'linear-gradient(90deg, #E8FF00, #FFB400)', width: vis ? `${skill.percent}%` : '0%', transition: 'width 1.4s ease', borderRadius: '2px' }} />
      </div>
      <div style={{ marginTop: '4px', fontFamily: 'Share Tech Mono', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', textAlign: 'right' }}>{skill.percent}%</div>
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 5vw, 48px)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle sub="Technical Competencies">Skills</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} delay={i * 0.1} />)}
        </div>

        {/* Leadership */}
        <div className="card-plasma" style={{ background: 'rgba(15,15,26,0.75)', padding: '24px', marginBottom: '20px', transition: 'all 0.3s ease' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{ width: '56px', height: '56px', flexShrink: 0, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>👥</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'white', fontWeight: 600, letterSpacing: '-0.01em' }}>Student Coordinator</span>
                <span className="plasma-tag">Leadership Role</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '12px' }}>
                Serving as  placemet Student Coordinator at Kishkinda University — organising academic events, bridging communication between students and faculty, and driving collaborative initiatives within the EEE department. Demonstrates initiative, organisational skill, and the ability to lead peers toward shared goals.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['Event Organisation', 'Team Leadership', 'Communication', 'Problem Solving'].map(t => <span key={t} className="plasma-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="card-hover" style={{ background: 'rgba(15,15,26,0.75)', padding: '20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'Orbitron', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Languages Spoken:</span>
            {['Kannada', 'Hindi', 'English', 'Telugu'].map(l => <span key={l} className="tag">{l}</span>)}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  return (
    <Section id="projects" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 5vw, 48px)', background: 'rgba(15,15,26,0.25)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle sub="Engineering Work">Projects</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {PROJECTS.map(p => (
            <div key={p.id} 
              onClick={() => setActiveProject(p)}
              style={{ background: 'rgba(15,15,26,0.75)', padding: '28px 28px 24px', position: 'relative', overflow: 'hidden', border: `1px solid ${p.type === 'plasma' ? 'rgba(0,229,255,0.15)' : 'rgba(232,255,0,0.1)'}`, transition: 'all 0.3s ease', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {p.featured && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }} />}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ width: '56px', height: '56px', flexShrink: 0, background: p.type === 'plasma' ? 'rgba(0,229,255,0.08)' : 'rgba(232,255,0,0.08)', border: `1px solid ${p.type === 'plasma' ? 'rgba(0,229,255,0.25)' : 'rgba(232,255,0,0.2)'}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{p.emoji}</div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'white', fontSize: '1.05rem', margin: 0, letterSpacing: '-0.01em' }}>{p.title}</h3>
                    <span className={p.type === 'plasma' ? 'plasma-tag' : 'tag'}>{p.type === 'plasma' ? '● ' : '✓ '}{p.status}</span>
                    {p.featured && <span style={{ fontFamily: 'Share Tech Mono', fontSize: '10px', color: '#00E5FF', animation: 'flicker 2s infinite' }}>FEATURED</span>}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '14px' }}>{p.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.tags.map(t => <span key={t} className={p.type === 'plasma' ? 'plasma-tag' : 'tag'}>{t}</span>)}
                    </div>
                    <span style={{ 
                      fontFamily: 'Share Tech Mono', 
                      fontSize: '0.75rem', 
                      color: p.type === 'plasma' ? '#00E5FF' : '#E8FF00', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      opacity: 0.85
                    }}>
                      DETAILS & PHASES →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {activeProject && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(5, 5, 10, 0.85)', backdropFilter: 'blur(12px)',
          padding: '20px', transition: 'all 0.3s ease'
        }}
        onClick={() => setActiveProject(null)}
        >
          <div style={{
            background: '#0D0D15',
            border: `1px solid ${activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00'}`,
            boxShadow: `0 0 40px ${activeProject.type === 'plasma' ? 'rgba(0,229,255,0.2)' : 'rgba(232,255,0,0.2)'}`,
            width: '100%', maxWidth: '680px',
            borderRadius: '8px', padding: '36px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={() => setActiveProject(null)} style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer', fontSize: '1.25rem', padding: '4px', transition: 'color 0.2s',
              lineHeight: 1
            }}
            onMouseEnter={e => e.target.style.color = activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ width: '64px', height: '64px', flexShrink: 0, background: activeProject.type === 'plasma' ? 'rgba(0,229,255,0.08)' : 'rgba(232,255,0,0.08)', border: `1px solid ${activeProject.type === 'plasma' ? 'rgba(0,229,255,0.25)' : 'rgba(232,255,0,0.2)'}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem' }}>
                {activeProject.emoji}
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, color: 'white', fontSize: '1.4rem', margin: '0 0 6px 0', letterSpacing: '0.03em', lineHeight: 1.2 }}>
                  {activeProject.title}
                </h3>
                <span className={activeProject.type === 'plasma' ? 'plasma-tag' : 'tag'}>
                  {activeProject.type === 'plasma' ? '● ' : '✓ '}{activeProject.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '28px' }}>
              {activeProject.description}
            </p>

            {/* Phases Section */}
            {activeProject.phases && (
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', color: activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  System Development Phases
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '16px' }}>
                  {/* Vertical line indicator */}
                  <div style={{ position: 'absolute', left: '7px', top: '12px', bottom: '12px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                  
                  {activeProject.phases.map((phase, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                      {/* Bullet marker */}
                      <div style={{ 
                        width: '15px', height: '15px', borderRadius: '50%', 
                        background: phase.status === 'Completed' 
                          ? (activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00')
                          : 'rgba(255, 255, 255, 0.1)', 
                        border: '3px solid #0D0D15', 
                        position: 'absolute', left: '-22px', top: '5px',
                        boxShadow: phase.status === 'Completed'
                          ? `0 0 10px ${activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00'}`
                          : 'none'
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'Share Tech Mono', fontSize: '0.75rem', color: phase.status === 'Completed' ? (activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00') : 'rgba(255,255,255,0.4)', border: `1px solid ${phase.status === 'Completed' ? (activeProject.type === 'plasma' ? 'rgba(0,229,255,0.3)' : 'rgba(232,255,0,0.3)') : 'rgba(255,255,255,0.1)'}`, padding: '1px 6px', borderRadius: '2px' }}>
                            {phase.number}
                          </span>
                          <h5 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'white', fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            {phase.title}
                            {phase.status && (
                              <span style={{ 
                                fontSize: '0.65rem', 
                                fontFamily: 'Share Tech Mono', 
                                color: phase.status === 'Completed' ? '#00E5FF' : '#E8FF00',
                                border: `1px solid ${phase.status === 'Completed' ? 'rgba(0,229,255,0.25)' : 'rgba(232,255,0,0.25)'}`,
                                background: phase.status === 'Completed' ? 'rgba(0,229,255,0.05)' : 'rgba(232,255,0,0.05)',
                                padding: '1px 6px',
                                borderRadius: '2px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}>
                                {phase.status}
                              </span>
                            )}
                          </h5>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                          {phase.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Section */}
            {activeProject.features && (
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', color: activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                  Key Technical Features
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeProject.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      <span style={{ color: activeProject.type === 'plasma' ? '#00E5FF' : '#E8FF00', fontWeight: 'bold' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Footer Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
              {activeProject.tags.map(t => (
                <span key={t} className={activeProject.type === 'plasma' ? 'plasma-tag' : 'tag'}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 5vw, 48px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SectionTitle sub="Academic Journey">Education</SectionTitle>
        <div style={{ position: 'relative' }}>
          <div className="timeline-line hidden md:block" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', flexShrink: 0, background: 'rgba(232,255,0,0.08)', border: '1px solid rgba(232,255,0,0.3)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>{e.icon}</div>
                <div className="card-hover" style={{ flex: 1, background: 'rgba(15,15,26,0.75)', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Orbitron', color: '#E8FF00', fontSize: '0.85rem', fontWeight: 700 }}>{e.year}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontFamily: 'Share Tech Mono', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Score/GPA:</span>
                      <span style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>{e.grade}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '4px', letterSpacing: '-0.01em' }}>{e.degree}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}>{e.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CertPreview({ c }) {
  const [hovered, setHovered] = useState(false);
  const MAX_VISIBLE_TAGS = 2;
  const visibleTags = c.tags.slice(0, MAX_VISIBLE_TAGS);
  const extraCount = c.tags.length - MAX_VISIBLE_TAGS;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: 'rgba(15,15,26,0.75)', border: `1px solid ${hovered ? c.accent + '66' : 'rgba(255,255,255,0.07)'}`, borderRadius: '6px', overflow: 'hidden', transition: 'all 0.3s ease', transform: hovered ? 'translateY(-5px)' : 'translateY(0)', boxShadow: hovered ? `0 12px 32px ${c.accent}22` : 'none', display: 'flex', flexDirection: 'column' }}
    >
      {/* Certificate preview panel */}
      <div style={{ background: c.previewBg, padding: '24px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '190px', position: 'relative' }}>
        {/* cert badge pill */}
        <div style={{ border: `1.5px solid ${c.previewText}88`, borderRadius: '999px', padding: '4px 14px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c.previewText} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.12em', color: c.previewText, textTransform: 'uppercase' }}>Certificate of Completion</span>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: c.previewText, opacity: 0.7, marginBottom: '2px' }}>KK Mohammed Akheel</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: c.previewText, opacity: 0.5, marginBottom: '10px', fontStyle: 'italic' }}>has completed</p>
        <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '1rem', color: c.previewText, textAlign: 'center', lineHeight: 1.3, marginBottom: '14px' }}>{c.title}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', color: c.previewText, opacity: 0.6, textTransform: 'uppercase' }}>{c.issuer}</p>
      </div>

      {/* Card info */}
      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Issuer label */}
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: c.accent, marginBottom: '8px', display: 'block' }}>{c.issuer}</span>

        <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'white', fontSize: '1.05rem', lineHeight: 1.4, marginBottom: '8px', letterSpacing: '-0.01em' }}>{c.title}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{c.date}</span>
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '14px', flex: 1 }}>{c.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {visibleTags.map(t => (
            <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', padding: '3px 10px', borderRadius: '999px', background: c.bg, border: `1px solid ${c.accent}44`, color: 'rgba(255,255,255,0.6)' }}>{t}</span>
          ))}
          {extraCount > 0 && (
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>+{extraCount} more</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Certificates() {
  return (
    <Section id="certificates" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 5vw, 48px)', background: 'rgba(15,15,26,0.25)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionTitle sub="Credentials & Recognition">Certificates</SectionTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {CERTIFICATES.map(c => <CertPreview key={c.title} c={c} />)}
        </div>

        {/* Achievements */}
        <div className="card-hover" style={{ background: 'rgba(15,15,26,0.75)', padding: '24px' }}>
          <h3 style={{ fontFamily: 'Orbitron', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '20px' }}>Academic & Sports Achievements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(10,10,15,0.5)', border: '1px solid rgba(232,255,0,0.08)', padding: '14px', borderRadius: '2px' }}>
                <span style={{ fontSize: '1.5rem' }}>{a.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem' }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const EmailSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const PhoneSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const LinkedInSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GitHubSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const ArrowSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function Contact() {
  return (
    <Section id="contact" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(16px, 5vw, 48px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#E8FF00', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Get In Touch</p>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'white', marginBottom: '12px' }}>Let's Work Together</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>Have a project in mind? Let's build something great.</p>
        </div>

        {/* Top two cards: Email + Phone */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          {/* Email */}
          <a href="mailto:akheelakmal@gmail.com" style={{ textDecoration: 'none' }}>
            <div className="card-hover" style={{ background: 'rgba(15,15,26,0.75)', padding: '28px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(232,255,0,0.06)' }} />
              <div style={{ width: '48px', height: '48px', background: 'rgba(232,255,0,0.12)', border: '1px solid rgba(232,255,0,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8FF00', marginBottom: '18px' }}>
                <EmailSVG />
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'white', fontSize: '1rem', marginBottom: '4px' }}>Email Me</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Drop me a line anytime</p>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#E8FF00' }}>akheelakmal@gmail.com</p>
            </div>
          </a>

          {/* Phone */}
          <a href="tel:+917090674014" style={{ textDecoration: 'none' }}>
            <div className="card-hover" style={{ background: 'rgba(15,15,26,0.75)', padding: '28px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0,229,255,0.06)' }} />
              <div style={{ width: '48px', height: '48px', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.25)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E5FF', marginBottom: '18px' }}>
                <PhoneSVG />
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'white', fontSize: '1rem', marginBottom: '4px' }}>Call Me</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>Mon – Fri, 9am – 6pm</p>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#00E5FF' }}>+91 7090674014</p>
            </div>
          </a>
        </div>

        {/* Connect With Me */}
        <div style={{ background: 'rgba(15,15,26,0.75)', border: '1px solid rgba(232,255,0,0.08)', padding: '28px' }}>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'white', fontSize: '1rem', textAlign: 'center', marginBottom: '20px' }}>Connect With Me</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { label: 'LinkedIn', sub: "Let's connect", href: 'https://www.linkedin.com/in/kk-mohammed-akheel-13609a333/', Icon: LinkedInSVG, accent: '#0A66C2', bg: 'rgba(10,102,194,0.1)', border: 'rgba(10,102,194,0.25)' },
              { label: 'GitHub', sub: 'View my projects', href: 'https://github.com/', Icon: GitHubSVG, accent: 'rgba(255,255,255,0.8)', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)' },
            ].map(({ label, sub, href, Icon, accent, bg, border }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: bg, border: `1px solid ${border}`, borderRadius: '6px', padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: accent }}><Icon /></span>
                    <div>
                      <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, color: 'white', fontSize: '0.875rem', margin: 0 }}>{label}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{sub}</p>
                    </div>
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}><ArrowSVG /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  const GHFoot = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
  const LIFoot = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
  const IGFoot = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
  const HeartSVG = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#E8FF00" style={{ display: 'inline', verticalAlign: 'middle', margin: '0 4px' }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: 'rgba(8,8,16,0.85)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '56px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>

        {/* Brand col */}
        <div style={{ maxWidth: '300px' }}>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#E8FF00', marginBottom: '14px' }}>KK Mohammed Akheel</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '24px' }}>
            Electrical & Electronics Engineering student passionate about power systems, embedded electronics, and real-world solutions.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { href: 'https://github.com/', Icon: GHFoot },
              { href: 'https://www.linkedin.com/in/kk-mohammed-akheel-13609a333/', Icon: LIFoot },
              { href: '#', Icon: IGFoot },
            ].map(({ href, Icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer"
                style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,255,0,0.1)'; e.currentTarget.style.color = '#E8FF00'; e.currentTarget.style.borderColor = 'rgba(232,255,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '20px' }}>Quick Links</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['About', 'Skills', 'Projects', 'Education', 'Certificates', 'Contact'].map(link => (
              <button key={link} onClick={() => scroll(link.toLowerCase())}
                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#E8FF00'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
              >{link}</button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '20px' }}>Contact</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['akheelakmal@gmail.com', '+91 7090674014', 'Karnataka, India'].map(item => (
              <p key={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{item}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
          © 2025 KK Mohammed Akheel. Made with <HeartSVG /> by Akheel
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ background: 'transparent', minHeight: '100vh' }}>
      <BackgroundCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
