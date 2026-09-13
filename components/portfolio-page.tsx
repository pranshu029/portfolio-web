'use client';

import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Download,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Eye,
  ChevronDown,
  Rocket,
  TerminalSquare
} from 'lucide-react';

// ThemeToggle removed — site is permanently dark
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { SkillIcon } from './ui/skill-logos';
import {
  achievements,
  aboutPoints,
  dsaPlatforms,
  educationTimeline,
  floatingBadges,
  navItems,
  projects,
  resumeUrl,
  skills,
  socialLinks
} from '../lib/site-data';

function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className ?? 'max-w-3xl'}`}>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/90 shadow-glow backdrop-blur-xl">
        <BadgeCheck className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{description}</p> : null}
    </div>
  );
}

function AnimatedCounter({ value, suffix = '+' }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const startTime = performance.now();
          const duration = 1400;

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(value * eased));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => {
        const size = 3 + (index % 4);
        const left = `${(index * 13) % 100}%`;
        const top = `${(index * 19) % 100}%`;
        const delay = `${-(index * 0.7)}s`;
        const duration = `${11 + (index % 6) * 2}s`;
        const colors = ['rgba(129,140,248,0.35)', 'rgba(34,211,238,0.3)', 'rgba(236,72,153,0.24)', 'rgba(16,185,129,0.26)'];

        return (
          <motion.span
            aria-hidden="true"
            key={index}
            className="absolute rounded-full blur-[0.2px]"
            initial={{ opacity: 0.2, y: 0 }}
            animate={{ opacity: [0.2, 0.75, 0.2], y: [-8, 12, -8] }}
            transition={{ duration: Number(duration.replace('s', '')) || 12, delay: index * 0.12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            style={{ width: size, height: size, left, top, background: colors[index % colors.length], animationDelay: delay, animationDuration: duration }}
          />
        );
      })}
    </div>
  );
}

function TechOrb({ className }: { className?: string }) {
  return <div className={`absolute rounded-full blur-3xl ${className ?? ''}`} />;
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mt-4 w-full rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-[0_20px_80px_rgba(8,15,35,0.65)] backdrop-blur-2xl md:hidden">
      <div className="grid gap-2">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={onNavigate} className="block w-full rounded-2xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/5 hover:text-white">
            {item.label}
          </a>
        ))}
      </div>
      <div className="mt-3">
        <ResumeMenu stacked onNavigate={onNavigate} />
      </div>
    </div>
  );
}

function ResumeMenu({ stacked = false, onNavigate }: { stacked?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const trigger = (
    <Button
      type="button"
      variant="outline"
      size={stacked ? 'lg' : 'sm'}
      className={`${stacked ? 'w-full justify-between border-white/10 bg-white/5' : 'border-white/10 bg-white/5'} ${open ? 'border-cyan-300/40' : ''}`}
      onClick={() => setOpen((v) => !v)}
      aria-haspopup="menu"
      aria-expanded={open}
    >
      Resume
      <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
    </Button>
  );

  return (
    <div ref={menuRef} className={stacked ? 'flex w-full flex-col items-stretch' : 'relative inline-flex'} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {trigger}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`${stacked ? 'relative mt-3 w-full' : 'absolute left-full top-0 z-50 ml-3 min-w-64 origin-left-top'} rounded-3xl border border-white/10 bg-slate-950/95 p-2 shadow-[0_24px_80px_rgba(2,6,23,0.75)] backdrop-blur-2xl`}
            style={{ maxHeight: '60vh', overflow: 'auto' }}
          >
            <div className="grid gap-2">
              <Button asChild variant="outline" className="justify-start border-white/10 bg-white/5">
                <a
                  href={resumeUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate();
                    window.open(resumeUrl, '_blank', 'noopener');
                  }}
                  rel="noreferrer"
                >
                  View Resume
                  <Eye className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button asChild className="justify-start">
                <a href={resumeUrl} download onClick={onNavigate}>
                  Download Resume
                  <Download className="ml-2 h-4 w-4 text-white/90" />
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function PortfolioPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Helpers for Skills cards
  const getSkillDescription = (skill: string) => {
    const map: Record<string, string> = {
      Java: 'Robust, object-oriented backend development',
      'Spring Boot': 'Production-ready microservices and REST APIs',
      Docker: 'Containerization for reproducible deployments',
      MySQL: 'Relational schema design and query optimization',
      REST: 'Designing consistent, versioned HTTP APIs',
      JavaScript: 'Scripting, tooling and frontend interop',
      'C++': 'Performance-critical systems and algorithms',
      'Spring Security': 'Authentication and authorization best practices',
      Hibernate: 'ORM mapping and transactional data access',
      'Spring Data JPA': 'Declarative repositories and pagination',
      PostgreSQL: 'Reliable SQL with advanced features',
      MongoDB: 'Flexible document storage for rapid iteration',
      'Docker Compose': 'Local multi-service orchestration',
      Nginx: 'Reverse proxying, caching and TLS termination',
      'GitHub Actions': 'CI/CD pipelines and automation'
    };

    return map[skill] ?? `Practical experience working with ${skill}.`;
  };

  const getInitials = (skill: string) => skill.split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase();

  const getAccent = (skill: string) => {
    // Simple deterministic accent selection
    const accents = [
      'from-indigo-500/40 via-cyan-400/30 to-fuchsia-500/30',
      'from-amber-400/30 via-orange-400/20 to-rose-400/20',
      'from-emerald-400/30 via-green-400/20 to-teal-300/20',
      'from-sky-400/30 via-indigo-300/20 to-violet-400/20'
    ];
    let h = 0;
    for (let i = 0; i < skill.length; i++) h = (h * 31 + skill.charCodeAt(i)) % accents.length;
    return accents[h];
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_22%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_20%),linear-gradient(180deg,#060816_0%,#050814_35%,#02040b_100%)] text-white">
      <FloatingParticles />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.16] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <TechOrb className="left-[-120px] top-24 h-72 w-72 bg-indigo-500/30" />
      <TechOrb className="right-[-80px] top-[22rem] h-80 w-80 bg-cyan-400/20" />
      <TechOrb className="bottom-[-120px] left-1/3 h-72 w-72 bg-fuchsia-500/20" />

      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? 'backdrop-blur-lg bg-[color:var(--card)]/72 border-b border-white/10 shadow-[0_10px_30px_rgba(2,6,23,0.6)]' : 'bg-transparent'} `}>
        <div className={`relative mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16 ${scrolled ? 'py-2' : 'py-3'} transition-all duration-300`}> 
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid h-12 w-auto min-w-[68px] place-items-center rounded-2xl border border-border bg-[color:var(--card)]/60 px-3 text-sm font-semibold text-foreground shadow-glow transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:border-[color:var(--accent)]/40 group-hover:bg-[color:var(--popover)]/60">
              Pranshu
            </span>
            <div className="hidden sm:flex flex-col leading-tight">
              <p className="text-sm font-semibold tracking-[0.14em] text-foreground/90">Pranshu Dwivedi</p>
              <p className="text-xs uppercase tracking-[0.22em] text-foreground/40">Backend Developer</p>
            </div>
          </a>

          {/* Centered nav for desktop */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:flex items-center">
            <nav className="pointer-events-auto flex items-center gap-3 max-w-lg rounded-full border border-border bg-[color:var(--popover)]/60 p-1.5 px-3 backdrop-blur-xl">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="rounded-full px-4 md:px-5 py-2 text-sm text-foreground/70 transition-colors duration-180 hover:bg-white/6 hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <ResumeMenu />
            </div>

            <div className="md:hidden flex items-center">
              <button aria-label="Toggle navigation" className="p-2 rounded-full" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen}>
                <Menu className="h-5 w-5 text-foreground/80" />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">{mobileOpen ? <MobileNav onNavigate={() => setMobileOpen(false)} /> : null}</div>
      </header>

      {/* spacer to offset fixed header so content isn't hidden underneath */}
      <div className="h-16 md:h-20" aria-hidden />

      <main>
        <section id="home" className="relative mx-auto min-h-[calc(100vh-88px)] max-w-7xl px-6 md:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={reduceMotion ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10 flex flex-col space-y-6 max-w-xl">
              <div className="flex flex-col items-start gap-3">
                <div className="inline-flex items-center gap-3">
                  <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/70">Hello, I’m</h2>
                  <div className="h-px w-12 bg-[color:var(--border)]/40" />
                </div>

                <h1 className="text-[clamp(2rem,5.6vw,3.25rem)] font-extrabold leading-tight bg-clip-text text-transparent bg-[linear-gradient(135deg,#ffffff_0%,#cbd5e1_35%,#67e8f9_70%,#a78bfa_100%)]">
                  Pranshu Dwivedi
                </h1>

                <p className="text-sm text-foreground/70 leading-6">Backend Developer &amp; DSA Enthusiast</p>

                <div className="ml-0 mt-1 inline-flex items-center gap-2 rounded-full border border-[color:var(--ring)]/18 bg-[color:var(--ring)]/8 px-3 py-1 text-xs text-[color:var(--ring)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--ring)]" />
                  Available for opportunities
                </div>
              </div>

              <p className="text-[clamp(0.98rem,1.4vw,1.125rem)] text-white/60 leading-7">
                Whether it's discussing algorithms, system design, or building robust backend systems — I'm always excited to collaborate.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {floatingBadges.map((badge) => (
                  <Badge key={badge} className="border-cyan-400/15 bg-white/5 px-3 py-2 text-sm text-white/80 shadow-sm">
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="mt-2 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="group w-full sm:w-auto h-12 flex items-center justify-center">
                  <a href="#projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>

                <div className="w-full sm:w-auto">
                  <ResumeMenu />
                </div>
              </div>
            </motion.div>

            <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 8 }} animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative flex w-full items-center justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <motion.div initial={reduceMotion ? {} : { y: -6 }} animate={reduceMotion ? {} : { y: [0, -6, 0] }} transition={reduceMotion ? {} : { repeat: Infinity, duration: 6, ease: 'easeInOut' }} className="">
                  <Card className="relative overflow-hidden border-white/10 bg-white/5 p-0 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_90px_rgba(2,6,23,0.7)] backdrop-blur-2xl">
                    <div className="border-b border-white/10 px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                        <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                        <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
                        <span className="ml-3 text-xs uppercase tracking-[0.28em] text-white/35">developer profile.json</span>
                      </div>
                    </div>

                    <CardContent className="grid gap-6 p-6">
                      <div className="flex items-center gap-4">
                        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-[linear-gradient(135deg,rgba(129,140,248,0.95),rgba(34,211,238,0.95))] text-lg font-semibold text-white shadow-[0_0_45px_rgba(34,211,238,0.25)]">
                          PD
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">Pranshu Dwivedi</p>
                          <p className="text-sm text-cyan-200/80">@backend.dev</p>
                        </div>
                        <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                          <span className="h-2 w-2 rounded-full bg-emerald-300" />
                          Available
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 font-mono text-[0.82rem] leading-7 text-slate-200 overflow-auto">
                        <div className="flex gap-4">
                          <span className="text-white/25">1</span>
                          <span className="text-white/40">// concise profile</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/25">2</span>
                          <span>{'{'}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/25">3</span>
                          <span className="text-cyan-300">{"  \"name\": \"Pranshu Dwivedi\","}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/25">4</span>
                          <span className="text-cyan-300">{"  \"role\": \"Backend Developer\","}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/25">5</span>
                          <span className="text-cyan-300">{"  \"focus\": [\"Java\", \"Spring Boot\", \"DSA\"],"}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/25">6</span>
                          <span className="text-cyan-300">{"  \"approach\": \"simple, scalable, secure\""}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-white/25">7</span>
                          <span>{'}'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                        {['Java', 'Spring Boot', 'Docker', 'MySQL', 'REST'].map((item, index) => (
                          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center text-xs font-medium text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/10">
                            <span className="block text-[10px] uppercase tracking-[0.22em] text-white/30">0{index + 1}</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <SectionBlock id="about">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7 }}>
              <Card className="relative overflow-hidden border-white/10 bg-white/5 shadow-glow">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.18),transparent_40%)]" />
                <CardContent className="relative p-8 text-center">
                  <div className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-[1.6rem] bg-[linear-gradient(135deg,#6366f1,#22d3ee,#ec4899)] text-2xl font-semibold text-white shadow-[0_0_60px_rgba(99,102,241,0.25)]">
                    PD
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Pranshu Dwivedi</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.28em] text-cyan-200/80">Backend Developer</p>
                  <p className="mt-4 text-sm leading-7 text-white/65">I build clean backend systems with Java and Spring Boot, and I care about the little things that make software feel fast, stable, and delightful.</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <AnimatedCounter value={200} />
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/40">DSA solved</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="text-2xl font-semibold tabular-nums text-white">2</span>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/40">Projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: 0.05 }} className="space-y-6">
              <SectionHeading eyebrow="About" className="max-w-2xl" title={<><>Scalable systems with a <span className="bg-[linear-gradient(135deg,#fff_0%,#67e8f9_55%,#a78bfa_100%)] bg-clip-text text-transparent">backend-first</span> mindset.</></>} description="I’m a backend developer focused on building reliable APIs, robust security layers, and maintainable architectures that grow well with product needs." />
              <div className="space-y-3">
                {aboutPoints.map((item) => (
                  <div key={item} className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-white/8 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                      <BadgeCheck className="h-5 w-5" />
                    </div>
                    <p className="text-sm leading-7 text-white/70 sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </SectionBlock>

        <SectionBlock id="education">
          <SectionHeading eyebrow="Education" title={<><>A timeline with <span className="bg-[linear-gradient(135deg,#fff_0%,#67e8f9_55%,#a78bfa_100%)] bg-clip-text text-transparent">strong foundations</span></></>} description="A progression through computer science studies, with a growing focus on engineering discipline, problem solving, and system thinking." />
          <div className="relative mt-10 space-y-5">
            <div className="absolute left-6 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(34,211,238,0.95),rgba(129,140,248,0.6),transparent)] sm:left-8" />
            {educationTimeline.map((item, index) => (
              <motion.div key={`${item.title}-${index}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: index * 0.08 }} className="relative grid gap-4 pl-16 sm:pl-20">
                <div className="absolute left-0 top-2 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/70 text-lg shadow-glow sm:left-2">
                  {index === 0 ? <GraduationCap className="h-5 w-5 text-cyan-200" /> : <MapPin className="h-5 w-5 text-cyan-200" />}
                </div>
                <Card className="border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{item.subtitle}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="skills">
          <SectionHeading eyebrow="Skills" title={<><>A modern <span className="bg-[linear-gradient(135deg,#fff_0%,#67e8f9_55%,#a78bfa_100%)] bg-clip-text text-transparent">Tech Arsenal</span></></>} description="Compact, categorized technology pills I use to build, ship, and support scalable products." />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {skills.map((group, index) => (
              <motion.div key={group.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.52, delay: index * 0.06 }}>
                <div className="rounded-2xl border border-white/6 bg-slate-950/60 p-4 backdrop-blur-md shadow-[0_6px_20px_rgba(2,6,23,0.5)] flex flex-col">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-xs uppercase tracking-[0.22em] text-white/40">{group.title}</h3>
                    <div className="flex-1 h-px bg-white/6" />
                    <span className="text-xs text-white/30">{group.items.length}</span>
                  </div>

                  <div className="flex flex-wrap items-start gap-2">
                    {group.items.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/4 border border-white/8 backdrop-blur-sm shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:scale-102 focus:outline-none"
                        title={skill}
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/6 ring-1 ring-white/6 shadow-sm">
                          <SkillIcon name={skill} className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm font-medium text-white/90 leading-5">{skill}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="projects">
          <SectionHeading eyebrow="Projects" title={<><>Featured work with a <span className="bg-[linear-gradient(135deg,#fff_0%,#67e8f9_55%,#a78bfa_100%)] bg-clip-text text-transparent">premium finish</span></></>} description="Selected projects that reflect backend depth, clean architecture, and practical product thinking." />
          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {projects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative block"
                aria-label={`Open ${project.name} on GitHub`}
              >
                <div className={`absolute -inset-px rounded-[2rem] bg-gradient-to-br ${project.accent} opacity-0 blur-xl transition duration-500 group-hover:opacity-100`} />
                <Card className="relative h-full overflow-hidden border-white/10 bg-slate-950/60 transition duration-300 group-hover:-translate-y-1 group-hover:border-white/15">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex gap-6">
                      <div className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${project.accent} text-white text-2xl font-bold`}>
                        {project.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                            <p className="mt-2 text-sm leading-7 text-white/60 sm:text-base">{project.description}</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/40 transition group-hover:text-white/80">
                            <ArrowUpRight className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3">
                          {project.highlights.map((highlight) => (
                            <div key={highlight} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/4 p-3 text-sm leading-7 text-white/70">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          {project.tags.map((tag) => (
                            <Badge key={tag} className="border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/75">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="dsa">
          <SectionHeading eyebrow="DSA" title={<><>Solving problems with <span className="bg-[linear-gradient(135deg,#fff_0%,#67e8f9_55%,#a78bfa_100%)] bg-clip-text text-transparent">speed and structure</span></></>} description="Competitive programming and DSA practice keep my engineering instincts sharp." />
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card className="relative h-full overflow-hidden border-cyan-300/20 bg-white/5 md:col-span-2 xl:col-span-2 xl:row-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_48%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.14),transparent_42%)]" />
              <CardContent className="relative flex h-full flex-col justify-between p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-white/35">Problem Solving</p>
                  <div className="mt-4 flex items-end gap-2 text-6xl font-semibold text-white sm:text-7xl">
                    <AnimatedCounter value={200} suffix="#+" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/65 sm:text-base">Solved 200+ DSA problems across core patterns and contest practice.</p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {['LeetCode', 'GFG', 'CodeChef'].map((platform) => (
                    <div key={platform} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center text-xs uppercase tracking-[0.2em] text-white/55">
                      {platform}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid w-full gap-4 sm:grid-cols-2 items-start">
              <div />
              <div className="flex w-full justify-end items-start gap-3">
                <Button asChild size="lg" className="group w-full max-w-xs justify-center">
                  <a href="#projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <ResumeMenu stacked />
              </div>
            </div>

            {dsaPlatforms.map((platform) => (
              <Card key={platform.name} className="h-full overflow-hidden border-white/10 bg-white/5">
                <div className={`h-1 bg-gradient-to-r ${platform.tone}`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">{platform.name}</span>
                    <TerminalSquare className="h-5 w-5 text-cyan-200" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/60">{platform.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="achievements">
          <SectionHeading eyebrow="Achievements" title={<><span className="bg-[linear-gradient(135deg,#fff_0%,#67e8f9_55%,#a78bfa_100%)] bg-clip-text text-transparent">Strong fundamentals</span></>} description="A quick scan of the areas I’m consistently strong in." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {achievements.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, scale: 0.98, y: 16 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.05 }} className={item.span === 2 ? 'xl:col-span-2' : 'xl:col-span-1'}>
                <Card className="h-full border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200 shadow-glow">
                      <Layers3 className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/60">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="contact">
          <SectionHeading eyebrow="Contact" title={<><span className="bg-[linear-gradient(135deg,#fff_0%,#67e8f9_55%,#a78bfa_100%)] bg-clip-text text-transparent">Let’s build something beautiful and useful</span></>} description="Reach out for backend roles, internships, collaborations, or if you just want to talk architecture." />
          <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start">
            <div className="space-y-5">
              <div className="rounded-3xl border border-white/8 bg-white/5 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.25)]">
                <p className="text-base leading-7 text-white/80">
                  Whether it's discussing DSA problems, mathematical concepts, or building powerful web applications — I'm all ears. Contact me for a free consultation.
                </p>
              </div>

              <Card className="border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(15,23,42,0.22)]">
                <CardContent className="p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/35">Social</p>
                  <div className="mt-4 grid gap-3">
                    {socialLinks.map((link) => {
                      const icon = link.label === 'GitHub' ? <Github className="h-5 w-5" /> : link.label === 'LinkedIn' ? <Linkedin className="h-5 w-5" /> : <Mail className="h-5 w-5" />;

                      return (
                        <a key={link.label} href={link.href} target={link.label === 'Email' ? undefined : '_blank'} rel={link.label === 'Email' ? undefined : 'noreferrer'} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/10">
                          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/6 text-cyan-200 ring-1 ring-white/8">{icon}</div>
                          <div className="min-w-0">
                            <p className="font-medium text-white">{link.label}</p>
                            <p className="truncate text-sm text-white/45">{link.handle}</p>
                          </div>
                          <ArrowUpRight className="ml-auto h-5 w-5 text-white/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(15,23,42,0.22)]">
                <CardContent className="p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/35">Work style</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {['Backend-first', 'Scalable APIs', 'Clean architecture', 'System design', 'Performance'].map((item) => (
                      <Badge key={item} className="border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/75">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex w-full items-center justify-center">
              <div className="w-full max-w-lg">
                <Card className="border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(15,23,42,0.22)]">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/35">Send a message</p>
                    </div>
                    <form
                      className="grid gap-4"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const form = event.currentTarget;
                        const formData = new FormData(form);
                        const name = String(formData.get('name') ?? '').trim();
                        const email = String(formData.get('email') ?? '').trim();
                        const message = String(formData.get('message') ?? '').trim();
                        const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'someone awesome'}`);
                        const body = encodeURIComponent(`${message}\n\n— ${name || 'Anonymous'} (${email || 'no email provided'})`);
                        window.location.href = `mailto:pranshud2005@gmail.com?subject=${subject}&body=${body}`;
                        form.reset();
                      }}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input name="name" placeholder="Name" autoComplete="name" />
                        <Input name="email" type="email" placeholder="Email" autoComplete="email" />
                      </div>
                      <Textarea name="message" placeholder="Tell me about the role, project, or idea..." />
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SectionBlock>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-white/45">Made with chai ☕ and a dash of code — handcrafted for curious minds.</p>
          <p className="text-xs uppercase tracking-[0.26em] text-white/30">Pranshu Dwivedi · Backend Developer</p>
        </div>
      </footer>
    </div>
  );
}

function SectionBlock({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      {children}
    </section>
  );
}
