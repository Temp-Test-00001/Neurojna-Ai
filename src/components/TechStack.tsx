import { techStackData } from '../data';

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">

      {/* Background wave shape */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, #2563eb 1px, transparent 1px), linear-gradient(to bottom, #2563eb 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-14">
          <div className="space-y-4">
            <span className="section-tag">Technologies</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Technologies We Train On
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Our programs cover the full modern AI and data stack — from core languages to enterprise tools.
            </p>
          </div>

          {/* Mini SVG stack illustration */}
          <div className="hidden lg:flex justify-center">
            <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs">
              {/* Stacked layers */}
              {[
                { y: 140, color: '#2563eb', opacity: 0.15, label: 'Data Layer' },
                { y: 105, color: '#7c3aed', opacity: 0.18, label: 'ML Layer' },
                { y: 70,  color: '#2563eb', opacity: 0.22, label: 'AI Layer' },
                { y: 35,  color: '#7c3aed', opacity: 0.28, label: 'App Layer' },
              ].map((layer, i) => (
                <g key={i}>
                  <ellipse cx="160" cy={layer.y + 10} rx="120" ry="18" fill={layer.color} fillOpacity={layer.opacity} />
                  <rect x="40" y={layer.y} width="240" height="20" rx="4" fill={layer.color} fillOpacity={layer.opacity * 0.6} />
                  <text x="160" y={layer.y + 14} textAnchor="middle" fontSize="9" fill={layer.color} fontWeight="600" fontFamily="Inter" fillOpacity="0.9">{layer.label}</text>
                </g>
              ))}
              {/* Connector lines */}
              <line x1="160" y1="35" x2="160" y2="10" stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
              <circle cx="160" cy="8" r="4" fill="#2563eb" fillOpacity="0.8" />
              <text x="160" y="4" textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="700" fontFamily="Inter" fillOpacity="0.7">API</text>
            </svg>
          </div>
        </div>

        <div className="space-y-10">
          {techStackData.map((category) => (
            <div key={category.id}>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5 border-b border-gray-200 dark:border-gray-800 pb-3">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {category.items.map((tech) => (
                  <div key={tech.name} className="card dark:bg-gray-900 dark:border-gray-800 p-5 flex items-start gap-3 group hover:border-brand dark:hover:border-blue-500 transition-colors">
                    <div className="w-3 h-3 rounded-full shrink-0 mt-1 group-hover:scale-125 transition-transform" style={{ backgroundColor: tech.color }} />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{tech.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{tech.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
