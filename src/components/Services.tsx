import { BrainCircuit, BarChart3, Sparkles, MessageSquareCode, LayoutDashboard, Zap, GitBranch } from 'lucide-react';
import { servicesData } from '../data';
import type { ReactElement } from 'react';

const iconMap: Record<string, any> = {
  BrainCircuit, BarChart3, Sparkles, MessageSquareCode, LayoutDashboard, Zap, GitBranch
};

const illustrations: Record<string, ReactElement> = {
  'ai-solutions': (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* Outer pulse ring */}
      <circle cx="70" cy="45" r="34" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.2" fill="none" strokeDasharray="4 4" className="svg-spin" />
      <circle cx="70" cy="45" r="22" fill="#2563eb" fillOpacity="0.08" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="3 3" className="svg-dash-flow" />
      {/* Core */}
      <circle cx="70" cy="45" r="11" fill="#2563eb" fillOpacity="0.85" className="svg-glow" />
      <circle cx="70" cy="45" r="4" fill="white" />
      {/* Orbiting nodes */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 70 + 34 * Math.cos(rad);
        const cy = 45 + 34 * Math.sin(rad);
        const colors = ['#2563eb','#7c3aed','#06b6d4','#2563eb','#7c3aed','#06b6d4'];
        return (
          <g key={i}>
            <line x1="70" y1="45" x2={cx} y2={cy} stroke={colors[i]} strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="3 2" className="svg-dash-flow" />
            <circle cx={cx} cy={cy} r="5" fill={colors[i]} fillOpacity="0.85" className="svg-node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        );
      })}
      <text x="70" y="82" textAnchor="middle" fontSize="7" fill="#2563eb" fontFamily="Space Grotesk" fontWeight="700" fillOpacity="0.7">NEURAL NETWORK</text>
    </svg>
  ),

  'data-analytics': (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      <line x1="15" y1="75" x2="130" y2="75" stroke="#e5e7eb" strokeWidth="1.5" />
      <line x1="15" y1="75" x2="15" y2="10" stroke="#e5e7eb" strokeWidth="1.5" />
      {[
        { x: 22, h: 28, c: '#2563eb' },
        { x: 44, h: 48, c: '#7c3aed' },
        { x: 66, h: 36, c: '#06b6d4' },
        { x: 88, h: 58, c: '#2563eb' },
        { x: 110, h: 42, c: '#7c3aed' },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={75 - b.h} width="16" height={b.h} rx="3" fill={b.c} fillOpacity="0.15" />
          <rect x={b.x} y={75 - b.h} width="16" height={b.h} rx="3" fill={b.c} fillOpacity="0.6" className="svg-bar" style={{ animationDelay: `${i * 0.1}s` }} />
          <rect x={b.x} y={75 - b.h} width="16" height="4" rx="2" fill={b.c} />
        </g>
      ))}
      <polyline points="30,47 52,27 74,39 96,17 118,33"
        stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.6"
        strokeDasharray="100" strokeDashoffset="100" className="svg-dash-flow" />
      {[30,52,74,96,118].map((x,i) => {
        const ys = [47,27,39,17,33];
        return <circle key={i} cx={x} cy={ys[i]} r="3" fill="#2563eb" className="svg-node-pulse" style={{ animationDelay: `${i*0.2}s` }} />;
      })}
      <text x="72" y="86" textAnchor="middle" fontSize="7" fill="#7c3aed" fontFamily="Space Grotesk" fontWeight="700" fillOpacity="0.7">ANALYTICS DASHBOARD</text>
    </svg>
  ),

  'generative-ai': (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      <rect x="10" y="12" width="120" height="60" rx="12" fill="#7c3aed" fillOpacity="0.06" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.25" />
      {/* Typing lines */}
      {[0,1,2,3].map(i => (
        <rect key={i} x="20" y={22 + i * 12} width={50 + i * 15} height="6" rx="3"
          fill="#7c3aed" fillOpacity={0.2 + i * 0.08} className="svg-glow" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      {/* Sparkle stars */}
      {[[108,20],[118,38],[105,55],[122,60]].map(([cx,cy],i) => (
        <text key={i} x={cx} y={cy} textAnchor="middle" fontSize={i % 2 === 0 ? 10 : 7}
          fill={i % 2 === 0 ? '#7c3aed' : '#2563eb'} className="svg-float" style={{ animationDelay: `${i * 0.5}s` }}>✦</text>
      ))}
      <text x="70" y="84" textAnchor="middle" fontSize="7" fill="#7c3aed" fontFamily="Space Grotesk" fontWeight="700" fillOpacity="0.7">GENERATIVE AI / LLM</text>
    </svg>
  ),

  'chatbots': (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* User bubble */}
      <rect x="8" y="8" width="72" height="32" rx="10" fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.3" />
      <polygon points="18,40 8,50 28,40" fill="#2563eb" fillOpacity="0.15" />
      {[0,1,2].map(i => <rect key={i} x="16" y={16 + i * 8} width={28 + i * 10} height="5" rx="2.5" fill="#2563eb" fillOpacity={0.35 + i * 0.1} />)}
      {/* Bot bubble */}
      <rect x="60" y="42" width="72" height="32" rx="10" fill="#7c3aed" fillOpacity="0.1" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.3" />
      <polygon points="122,74 132,82 112,74" fill="#7c3aed" fillOpacity="0.15" />
      {[0,1].map(i => <rect key={i} x="68" y={50 + i * 10} width={30 + i * 12} height="5" rx="2.5" fill="#7c3aed" fillOpacity={0.35 + i * 0.1} />)}
      {/* Typing dots */}
      {[0,1,2].map(i => (
        <circle key={i} cx={68 + i * 8} cy={62} r="2.5" fill="#7c3aed" fillOpacity="0.7"
          className="svg-node-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <text x="70" y="84" textAnchor="middle" fontSize="7" fill="#2563eb" fontFamily="Space Grotesk" fontWeight="700" fillOpacity="0.7">AI CHATBOT</text>
    </svg>
  ),

  'dashboard-development': (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      <rect x="8" y="6" width="124" height="72" rx="8" fill="#f8fafc" stroke="#e5e7eb" strokeWidth="1.2" />
      <rect x="8" y="6" width="124" height="16" rx="8" fill="#2563eb" fillOpacity="0.12" />
      {[22,38,54].map(x => <circle key={x} cx={x} cy="14" r="3.5" fill="#2563eb" fillOpacity={0.3 + (x/100)} />)}
      {/* Left chart */}
      <rect x="14" y="28" width="50" height="42" rx="6" fill="#2563eb" fillOpacity="0.05" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.2" />
      <polyline points="20,62 30,50 40,55 50,40 58,44"
        stroke="#2563eb" strokeWidth="1.8" fill="none" strokeLinecap="round" className="svg-dash-flow" />
      {/* Right widgets */}
      <rect x="70" y="28" width="56" height="18" rx="5" fill="#7c3aed" fillOpacity="0.08" stroke="#7c3aed" strokeWidth="0.8" strokeOpacity="0.25" />
      <rect x="70" y="52" width="56" height="18" rx="5" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeWidth="0.8" strokeOpacity="0.25" />
      <circle cx="82" cy="37" r="6" stroke="#7c3aed" strokeWidth="3" strokeDasharray="20 18" fill="none" className="svg-spin" />
      <text x="70" y="84" textAnchor="middle" fontSize="7" fill="#2563eb" fontFamily="Space Grotesk" fontWeight="700" fillOpacity="0.7">ENTERPRISE DASHBOARD</text>
    </svg>
  ),

  'mvp-development': (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* Rocket */}
      <ellipse cx="70" cy="38" rx="14" ry="22" fill="#2563eb" fillOpacity="0.15" stroke="#2563eb" strokeWidth="1.2" strokeOpacity="0.5" className="svg-float" />
      <polygon points="70,16 62,38 78,38" fill="#2563eb" fillOpacity="0.7" className="svg-float" />
      <circle cx="70" cy="36" r="5" fill="white" fillOpacity="0.9" className="svg-float" />
      {/* Flames */}
      {[-6,0,6].map((dx,i) => (
        <ellipse key={i} cx={70+dx} cy="62" rx="3" ry={5 + i} fill={i===1?'#f97316':'#fbbf24'} fillOpacity="0.7"
          className="svg-glow" style={{ animationDelay: `${i*0.2}s` }} />
      ))}
      {/* Stars */}
      {[[20,20],[110,15],[25,55],[115,50]].map(([cx,cy],i) => (
        <text key={i} x={cx} y={cy} fontSize="8" fill="#7c3aed" fillOpacity="0.5"
          className="svg-float" style={{ animationDelay: `${i*0.4}s` }}>★</text>
      ))}
      <text x="70" y="84" textAnchor="middle" fontSize="7" fill="#2563eb" fontFamily="Space Grotesk" fontWeight="700" fillOpacity="0.7">STARTUP MVP</text>
    </svg>
  ),

  'devops': (
    <svg viewBox="0 0 140 90" fill="none" className="w-full h-full">
      {/* Infinity loop */}
      <path d="M35,45 C35,30 52,30 70,45 C88,60 105,60 105,45 C105,30 88,30 70,45 C52,60 35,60 35,45 Z"
        stroke="url(#devGrad)" strokeWidth="2.5" fill="none" strokeOpacity="0.7" className="svg-dash-flow" strokeDasharray="6 3" />
      <defs>
        <linearGradient id="devGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {/* Nodes */}
      {[[35,45,'#2563eb'],[70,32,'#7c3aed'],[105,45,'#06b6d4'],[70,58,'#2563eb']].map(([cx,cy,c],i) => (
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r="7" fill={c as string} fillOpacity="0.15" />
          <circle cx={cx as number} cy={cy as number} r="5" fill={c as string} fillOpacity="0.85" className="svg-node-pulse" style={{ animationDelay: `${i*0.4}s` }} />
        </g>
      ))}
      {/* Labels */}
      {[['Build',35,68],['Deploy',70,18],['Monitor',105,68],['Scale',70,80]].map(([label,x,y]) => (
        <text key={label as string} x={x as number} y={y as number} textAnchor="middle" fontSize="7"
          fill="#2563eb" fontFamily="Space Grotesk" fontWeight="700" fillOpacity="0.8">{label}</text>
      ))}
    </svg>
  ),
};

export default function Services() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="services" className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="section-tag">Our Programs</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Training Programs We Offer
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-sans">
            Comprehensive, hands-on programs designed to upskill your team with the technologies shaping tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((svc) => {
            const Icon = iconMap[svc.iconName] || BrainCircuit;
            const Illustration = illustrations[svc.id];
            return (
              <div key={svc.id} className="card dark:bg-gray-900 dark:border-gray-800 overflow-hidden group cursor-default">
                {/* Illustration banner */}
                <div className="h-36 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-blue-950/20 border-b border-gray-100 dark:border-gray-700 flex items-center justify-center p-5">
                  <div className="w-full h-full">{Illustration}</div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-light dark:bg-blue-950 flex items-center justify-center shrink-0 group-hover:bg-brand transition-colors">
                      <Icon className="w-4 h-4 text-brand group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-sm leading-snug">{svc.title}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed font-sans">{svc.description}</p>
                  <ul className="space-y-1.5">
                    {svc.features.map((f) => (
                      <li key={f} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">{svc.metric.label}</span>
                    <span className="font-display font-bold text-brand text-sm">{svc.metric.value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button onClick={() => scrollTo('#contact')} className="btn-primary">Enquire About a Program</button>
        </div>
      </div>
    </section>
  );
}
