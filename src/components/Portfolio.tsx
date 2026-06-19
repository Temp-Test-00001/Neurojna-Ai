import { useState } from 'react';
import { portfolioData } from '../data';
import { ChevronDown, ChevronUp } from 'lucide-react';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Generative AI', value: 'gen-ai' },
  { label: 'Dashboards', value: 'dashboards' },
  { label: 'Analytics', value: 'analytics' },
  { label: 'MVP', value: 'mvp' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeCategory === 'all'
    ? portfolioData
    : portfolioData.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-400/5 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="section-tag">Case Studies</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Real Results for Real Clients
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-sans">
            A selection of projects where our training and solutions delivered measurable impact.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map(cat => (
            <button key={cat.value}
              onClick={() => { setActiveCategory(cat.value); setExpandedId(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all font-sans ${
                activeCategory === cat.value
                  ? 'bg-brand text-white shadow-md shadow-blue-500/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((proj) => {
            const isOpen = expandedId === proj.id;
            return (
              <div key={proj.id} className="card dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
                <button className="w-full p-6 text-left flex items-start justify-between gap-4 group"
                  onClick={() => setExpandedId(isOpen ? null : proj.id)}>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-medium text-brand bg-brand-light dark:bg-blue-950 dark:text-blue-400 px-2.5 py-0.5 rounded-full capitalize font-mono">
                        {proj.category.replace('-', ' ')}
                      </span>
                      {proj.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full font-mono">{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-white text-base group-hover:text-brand dark:group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-sans">{proj.description}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className="font-display font-bold text-brand text-lg">{proj.metrics.value}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">{proj.metrics.label}</div>
                    </div>
                    {isOpen
                      ? <ChevronUp className="w-5 h-5 text-brand" />
                      : <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2 font-mono">Challenge</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">{proj.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-brand dark:text-blue-400 uppercase tracking-wide mb-2 font-mono">Solution</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">{proj.caseStudy.solution}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2 font-mono">Impact</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans">{proj.caseStudy.impact}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
