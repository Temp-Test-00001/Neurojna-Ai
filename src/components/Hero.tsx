import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Sparkles, ArrowRight, Brain, Zap, BarChart3 } from 'lucide-react';

// ── Particle neural network canvas ──────────────────────────────────────────
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; color: string;
}

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#6366f1'];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn particles
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    particles.current = Array.from({ length: Math.max(count, 40) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;

      // Draw connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        // Mouse repulsion / attraction
        const mdx = pts[i].x - mouse.current.x;
        const mdy = pts[i].y - mouse.current.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 100) {
          pts[i].vx += (mdx / md) * 0.3;
          pts[i].vy += (mdy / md) * 0.3;
        }

        // Move
        pts[i].x += pts[i].vx;
        pts[i].y += pts[i].vy;
        pts[i].vx *= 0.99;
        pts[i].vy *= 0.99;

        // Bounce
        if (pts[i].x < 0 || pts[i].x > canvas.width)  pts[i].vx *= -1;
        if (pts[i].y < 0 || pts[i].y > canvas.height) pts[i].vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fillStyle = pts[i].color;
        ctx.globalAlpha = 0.75;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Mouse glow
      if (mouse.current.x > 0) {
        const g = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 80);
        g.addColorStop(0, 'rgba(99,102,241,0.12)');
        g.addColorStop(1, 'rgba(99,102,241,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -999, y: -999 }; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'crosshair' }}
    />
  );
}

// ── Typing animation ─────────────────────────────────────────────────────────
const phrases = [
  'Artificial Intelligence',
  'Machine Learning',
  'Generative AI',
  'Data Science',
  'Cloud & DevOps',
];

function TypingText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIdx]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400">
      {displayed}
      <span className="animate-pulse text-violet-400">|</span>
    </span>
  );
}

// ── Live AI terminal panel ────────────────────────────────────────────────────
const terminalLines = [
  { text: '> Initializing Neurojna AI Engine...', color: 'text-cyan-400', delay: 0 },
  { text: '> Loading LLM model weights...', color: 'text-blue-400', delay: 600 },
  { text: '> Connecting to vector store ✓', color: 'text-green-400', delay: 1200 },
  { text: '> RAG pipeline: ACTIVE', color: 'text-violet-400', delay: 1800 },
  { text: '> Training modules: 7 loaded', color: 'text-blue-400', delay: 2400 },
  { text: '> System ready. Welcome! ✦', color: 'text-green-300', delay: 3000 },
];

function TerminalPanel() {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisible(v => [...v, i]), line.delay);
    });
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gray-950/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-gray-400 font-mono ml-2">neurojna-ai — terminal</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-mono">LIVE</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-xs space-y-2 min-h-[180px]">
        {terminalLines.map((line, i) =>
          visible.includes(i) ? (
            <div key={i} className={`${line.color} flex items-start gap-2 animate-fade-in`}>
              <span className="text-gray-600 select-none">{String(i + 1).padStart(2, '0')}</span>
              <span>{line.text}</span>
            </div>
          ) : null
        )}
        {visible.length === terminalLines.length && (
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <span>{'>'}</span>
            <span className="w-2 h-4 bg-blue-400 animate-pulse inline-block" />
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 border-t border-white/10">
        {[
          { label: 'Accuracy', value: '98.4%', color: 'text-green-400' },
          { label: 'Latency', value: '14ms', color: 'text-cyan-400' },
          { label: 'Uptime', value: '99.9%', color: 'text-violet-400' },
        ].map(s => (
          <div key={s.label} className="px-4 py-3 text-center border-r border-white/10 last:border-0">
            <div className={`font-display font-bold text-sm ${s.color}`}>{s.value}</div>
            <div className="text-gray-500 text-[10px] font-mono mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Floating badge ────────────────────────────────────────────────────────────
function FloatingBadge({ icon: Icon, label, sub, color, style }: {
  icon: any; label: string; sub: string; color: string; style?: CSSProperties;
}) {
  return (
    <div className="absolute flex items-center gap-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg"
      style={style}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <div className="text-white text-xs font-semibold font-display leading-none">{label}</div>
        <div className="text-white/50 text-[10px] font-mono mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">

      {/* Interactive particle canvas */}
      <NeuralCanvas />

      {/* Deep gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-gray-950/80 to-violet-950/60 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: Copy ── */}
          <div className="space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              AI-Powered Corporate Training
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              Master the Future of{' '}
              <br className="hidden sm:block" />
              <TypingText />
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-lg font-sans">
              Neurojna AI delivers enterprise-grade training in AI, ML, Data Science, and Cloud — empowering your team to build, deploy, and scale intelligent systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('#contact')}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5">
                Start Your Training
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('#services')}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-all backdrop-blur-sm">
                Explore Programs
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
              {[
                { value: '500+', label: 'Professionals Trained' },
                { value: '50+', label: 'Corporate Clients' },
                { value: '4.8★', label: 'Avg Rating' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Terminal + floating badges ── */}
          <div className="hidden lg:block relative">
            <TerminalPanel />

            {/* Floating badges */}
            <FloatingBadge icon={Brain} label="Neural Networks" sub="Deep Learning" color="bg-blue-600"
              style={{ top: '-18px', left: '-24px', animation: 'float-badge 4s ease-in-out infinite' }} />
            <FloatingBadge icon={Zap} label="GenAI Ready" sub="LLM Fine-tuning" color="bg-violet-600"
              style={{ bottom: '60px', right: '-28px', animation: 'float-badge 4s ease-in-out infinite 1s' }} />
            <FloatingBadge icon={BarChart3} label="Analytics" sub="Real-time insights" color="bg-cyan-600"
              style={{ bottom: '-18px', left: '20px', animation: 'float-badge 4s ease-in-out infinite 2s' }} />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 z-10">
        <span className="text-xs font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>

      <style>{`
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease forwards; }
      `}</style>
    </section>
  );
}
