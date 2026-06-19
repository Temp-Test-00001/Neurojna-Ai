import React, { useState } from 'react';
import { Mail, MapPin, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { faqData } from '../data';
import { submitEnquiry } from '../admin/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: 'ai-solutions', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email';
    if (!formData.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsSubmitting(true);
    try {
      await submitEnquiry(formData);
      setIsSent(true);
    } catch (err: any) {
      setErrors({ submit: err.message || 'Failed to send. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="section-tag">Contact Us</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">Let's Build Something Together</h2>
          <p className="text-gray-500 dark:text-gray-400 font-sans">Reach out to discuss your training needs or get a customised program proposal.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-8">
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'infoneurojnaai@gmail.com', href: 'mailto:infoneurojnaai@gmail.com' },
                { icon: MapPin, label: 'Location', value: 'Nagpur, India', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-light dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide font-mono">{label}</div>
                    {href
                      ? <a href={href} className="text-sm font-medium text-gray-900 dark:text-white hover:text-brand dark:hover:text-blue-400 transition-colors font-sans">{value}</a>
                      : <div className="text-sm font-medium text-gray-900 dark:text-white font-sans">{value}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {faqData.map((faq, i) => (
                  <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-sans">
                      <span>{faq.question}</span>
                      {openFaq === i
                        ? <ChevronUp className="w-4 h-4 text-brand shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />}
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3 font-sans">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="card dark:bg-gray-900 dark:border-gray-800 p-8">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 font-mono uppercase tracking-wide">Name *</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name" className={errors.name ? '!border-red-400' : ''} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 font-mono uppercase tracking-wide">Email *</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com" className={errors.email ? '!border-red-400' : ''} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 font-mono uppercase tracking-wide">Company</label>
                    <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Your company" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 font-mono uppercase tracking-wide">Program Interest</label>
                    <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                      <option value="ai-solutions">AI Solutions</option>
                      <option value="analytics">Data Analytics & BI</option>
                      <option value="generative-ai">Generative AI / LLM</option>
                      <option value="chatbots">AI Chatbots</option>
                      <option value="dashboards">Dashboard Development</option>
                      <option value="mvp">Startup MVP</option>
                      <option value="devops">DevOps & Cloud</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 font-mono uppercase tracking-wide">Message *</label>
                  <textarea rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your training needs..." className={errors.message ? '!border-red-400' : ''} />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                {errors.submit && (
                  <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                    {errors.submit}
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2">
                  {isSubmitting
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                    : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Send className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-sans">Thanks {formData.name}, we'll get back to you within 24 hours.</p>
                <button onClick={() => { setIsSent(false); setFormData({ name: '', email: '', company: '', service: 'ai-solutions', message: '' }); }}
                  className="btn-outline text-sm">Send Another Message</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
