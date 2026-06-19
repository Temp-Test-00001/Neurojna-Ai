import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { subscribeNewsletter } from '../admin/api';

export default function Footer() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subState, setSubState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setSubState('loading');
    try {
      await subscribeNewsletter(email);
      setSubState('done');
      setEmail('');
    } catch {
      setSubState('error');
    }
  };

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Tech Stack', href: '#tech-stack' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-800">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="Neurojna AI" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering organisations with AI and technology training that drives real-world results.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Mail, href: 'mailto:infoneurojnaai@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-brand hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm">
              <p>infoneurojnaai@gmail.com</p>
              <p>Nagpur, India</p>
            </div>
            <button onClick={() => scrollTo('#contact')}
              className="mt-5 btn-primary text-sm">
              Start a Conversation
            </button>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="text-white font-semibold text-xs mb-2 uppercase tracking-wide font-mono">Newsletter</h5>
              {subState === 'done' ? (
                <p className="text-green-400 text-xs font-mono">✓ Subscribed!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com" required
                    className="!bg-gray-800 !border-gray-700 !text-white !text-xs !py-2 !px-3 flex-1" />
                  <button type="submit" disabled={subState === 'loading'}
                    className="bg-brand hover:bg-brand-dark text-white text-xs px-3 py-2 rounded-lg transition-colors shrink-0">
                    {subState === 'loading' ? '...' : 'Join'}
                  </button>
                </form>
              )}
              {subState === 'error' && <p className="text-red-400 text-xs mt-1 font-mono">Failed. Try again.</p>}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>&copy; {year} Neurojna AI Pvt. Ltd. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
