import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Tech Stack', href: '#tech-stack' },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-sm dark:shadow-gray-900'
        : 'bg-white dark:bg-gray-950'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Neurojna AI" className="h-12 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-blue-400 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button onClick={() => scrollTo('#contact')} className="btn-primary text-sm">
            Get in Touch
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-6 py-6 space-y-4">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="block text-base text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-blue-400 transition-colors py-1">
              {link.label}
            </a>
          ))}
          <button onClick={() => scrollTo('#contact')} className="btn-primary w-full mt-4">Get in Touch</button>
        </div>
      )}
    </header>
  );
}
