import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '核心优势', href: '#features' },
  { label: '课程体系', href: '#courses' },
  { label: '师资团队', href: '#teachers' },
  { label: '综评赛事', href: '#competitions' },
  { label: '联系我们', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-br from-[#1e3c8b] to-[#f58220]' 
                  : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <span className={`font-bold text-lg ${isScrolled ? 'text-white' : 'text-white'}`}>
                  一
                </span>
              </div>
              <div className={`hidden sm:block transition-colors duration-300 ${
                isScrolled ? 'text-[#1a1a1a]' : 'text-white'
              }`}>
                <div className="font-bold text-lg leading-tight">一简科创</div>
                <div className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-gray-500' : 'text-white/70'
                }`}>以简驭繁，决胜综评</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-[#f58220] ${
                    isScrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="tel:18301980613"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-[#1e3c8b]' : 'text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                183-0198-0613
              </a>
              <Button 
                className="bg-[#f58220] hover:bg-[#e07418] text-white rounded-xl px-6"
                onClick={() => scrollToSection('#contact')}
              >
                免费咨询
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-[#1a1a1a]' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-[#f58220]/10 hover:text-[#f58220] rounded-xl transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 px-4 mb-4">
                <Phone className="w-5 h-5 text-[#f58220]" />
                <span className="text-gray-700 font-medium">183-0198-0613</span>
              </div>
              <Button 
                className="w-full bg-[#f58220] hover:bg-[#e07418] text-white py-6 rounded-xl"
                onClick={() => scrollToSection('#contact')}
              >
                免费咨询
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
