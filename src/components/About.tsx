import { CheckCircle } from 'lucide-react';

const points = [
  "Industry-expert trainers with real-world experience",
  "Customized programs tailored to your team's needs",
  "Hands-on, project-based learning approach",
  "Post-training support and resources",
  "Flexible delivery — online, on-site, or hybrid",
];

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Decorative top-right blob */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: SVG illustration */}
          <div className="hidden lg:flex items-center justify-center order-last lg:order-first">
            <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
              {/* Background card shapes */}
              <rect x="30" y="40" width="160" height="100" rx="16" fill="#2563eb" fillOpacity="0.07" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.2" />
              <rect x="220" y="40" width="160" height="100" rx="16" fill="#7c3aed" fillOpacity="0.07" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.2" />
              <rect x="120" y="200" width="180" height="110" rx="16" fill="#2563eb" fillOpacity="0.07" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.2" />

              {/* Card 1: bar chart */}
              {[0,1,2,3].map((i) => (
                <rect key={i} x={55 + i * 28} y={110 - i * 14} width="18" height={20 + i * 14} rx="4"
                  fill="#2563eb" fillOpacity={0.4 + i * 0.15} />
              ))}
              <text x="110" y="58" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="700" fontFamily="Inter">Analytics</text>

              {/* Card 2: pie-like arcs */}
              <circle cx="300" cy="90" r="30" stroke="#7c3aed" strokeWidth="10" strokeOpacity="0.2" fill="none" />
              <circle cx="300" cy="90" r="30" stroke="#7c3aed" strokeWidth="10" strokeDasharray="60 130" strokeDashoffset="-10" fill="none" strokeOpacity="0.8" />
              <circle cx="300" cy="90" r="30" stroke="#2563eb" strokeWidth="10" strokeDasharray="40 130" strokeDashoffset="-70" fill="none" strokeOpacity="0.6" />
              <text x="300" y="58" textAnchor="middle" fontSize="10" fill="#7c3aed" fontWeight="700" fontFamily="Inter">GenAI</text>

              {/* Card 3: neural dots */}
              {[
                [145, 240], [175, 260], [205, 240], [235, 260], [265, 240], [175, 290], [235, 290]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="7" fill="#2563eb" fillOpacity="0.7" />
              ))}
              {[
                [[145,240],[175,260]], [[175,260],[205,240]], [[205,240],[235,260]],
                [[235,260],[265,240]], [[175,260],[175,290]], [[235,260],[235,290]]
              ].map(([[x1,y1],[x2,y2]], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.3" />
              ))}
              <text x="210" y="218" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="700" fontFamily="Inter">Neural Networks</text>

              {/* Floating badges */}
              <rect x="10" y="180" width="80" height="26" rx="13" fill="#2563eb" fillOpacity="0.12" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.3" />
              <text x="50" y="196" textAnchor="middle" fontSize="9" fill="#2563eb" fontWeight="600" fontFamily="Inter">ML Training</text>

              <rect x="320" y="180" width="80" height="26" rx="13" fill="#7c3aed" fillOpacity="0.12" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.3" />
              <text x="360" y="196" textAnchor="middle" fontSize="9" fill="#7c3aed" fontWeight="600" fontFamily="Inter">LLM Fine-tune</text>

              <rect x="150" y="330" width="110" height="26" rx="13" fill="#2563eb" fillOpacity="0.12" stroke="#2563eb" strokeWidth="1" strokeOpacity="0.3" />
              <text x="205" y="346" textAnchor="middle" fontSize="9" fill="#2563eb" fontWeight="600" fontFamily="Inter">Data Pipelines</text>
            </svg>
          </div>

          {/* Right: Text */}
          <div className="space-y-6">
            <span className="section-tag">About Us</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white leading-tight">
              Bridging the Gap Between AI Research and Real-World Application
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Neurojna AI was established to close the gap between academic AI research and practical business application. We deliver high-impact training programs that help organisations upgrade their workforce and stay future-ready with cutting-edge technologies like GenAI, AI Agents, and automation tools.
            </p>
            <ul className="space-y-3">
              {points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                  <CheckCircle className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats row below */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-14">
          {[
            { value: '45+', label: 'Programs Delivered', color: 'text-brand' },
            { value: '120+', label: 'Hours of Content', color: 'text-violet-600' },
            { value: '98%', label: 'Satisfaction Rate', color: 'text-brand' },
            { value: '35+', label: 'Enterprise Clients', color: 'text-violet-600' },
          ].map((item) => (
            <div key={item.label} className="card dark:bg-gray-800 dark:border-gray-700 p-6 text-center">
              <div className={`font-display font-bold text-4xl ${item.color}`}>{item.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
