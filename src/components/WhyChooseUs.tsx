import { CalendarRange, Cpu, GraduationCap, Rocket, ShieldCheck } from 'lucide-react';
import { whyChooseUsData } from '../data';

const iconMap: Record<string, any> = { CalendarRange, Cpu, GraduationCap, Rocket, ShieldCheck };

export default function WhyChooseUs() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="why-us" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-14">
          {/* Left: text */}
          <div className="space-y-4">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Why Organisations Trust Neurojna AI
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              We align ourselves with your goals, delivery timelines, and growth targets to deliver training that actually moves the needle.
            </p>
          </div>

          {/* Right: SVG illustration */}
          <div className="hidden lg:flex justify-center">
            <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
              {/* Trophy / award shape */}
              <rect x="140" y="30" width="80" height="70" rx="40" fill="#2563eb" fillOpacity="0.12" stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.4" />
              <rect x="155" y="100" width="50" height="16" rx="4" fill="#2563eb" fillOpacity="0.2" />
              <rect x="145" y="116" width="70" height="12" rx="4" fill="#2563eb" fillOpacity="0.15" />
              <text x="180" y="72" textAnchor="middle" fontSize="22" fill="#2563eb" fontWeight="800" fontFamily="Inter">★</text>

              {/* Upward trend line */}
              <polyline points="30,200 80,170 130,155 180,130 230,110 280,85 330,60"
                stroke="#2563eb" strokeWidth="2.5" strokeOpacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="330" cy="60" r="5" fill="#2563eb" fillOpacity="0.9" />
              <circle cx="180" cy="130" r="4" fill="#7c3aed" fillOpacity="0.9" />
              <circle cx="80" cy="170" r="4" fill="#2563eb" fillOpacity="0.7" />

              {/* Baseline */}
              <line x1="20" y1="210" x2="340" y2="210" stroke="#e5e7eb" strokeWidth="1.5" />

              {/* Floating stat chips */}
              <rect x="20" y="220" width="70" height="24" rx="12" fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.3" />
              <text x="55" y="235" textAnchor="middle" fontSize="9" fill="#2563eb" fontWeight="600" fontFamily="Inter">3x Faster</text>

              <rect x="140" y="220" width="80" height="24" rx="12" fill="#7c3aed" fillOpacity="0.1" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.3" />
              <text x="180" y="235" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="600" fontFamily="Inter">99.99% Uptime</text>

              <rect x="270" y="220" width="70" height="24" rx="12" fill="#2563eb" fillOpacity="0.1" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.3" />
              <text x="305" y="235" textAnchor="middle" fontSize="9" fill="#2563eb" fontWeight="600" fontFamily="Inter">24/7 Support</text>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsData.map((item) => {
            const Icon = iconMap[item.iconName] || ShieldCheck;
            return (
              <div key={item.id} className="card dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 group hover:border-brand dark:hover:border-blue-500 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-brand-light dark:bg-blue-950 flex items-center justify-center group-hover:bg-brand transition-colors">
                  <Icon className="w-5 h-5 text-brand group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="font-display font-bold text-2xl text-brand">{item.metric}</span>
                  <span className="text-xs text-gray-400 block mt-0.5">{item.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-brand rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Banner decoration */}
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute left-1/2 bottom-0 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="text-white space-y-1 relative z-10">
            <h4 className="font-display font-bold text-lg">Ready to upskill your team?</h4>
            <p className="text-blue-100 text-sm">Get a free consultation and customised training plan for your organisation.</p>
          </div>
          <button onClick={() => scrollTo('#contact')}
            className="relative z-10 bg-white text-brand font-semibold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0">
            Get Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
