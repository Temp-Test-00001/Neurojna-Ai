import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminApp from './admin/AdminApp';

// Simple client-side routing — /admin goes to admin panel
const isAdmin = window.location.pathname.startsWith('/admin');

export default function App() {
  if (isAdmin) return <AdminApp />;

  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
