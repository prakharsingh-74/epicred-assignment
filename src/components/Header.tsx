import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase as BriefcaseBusiness } from 'lucide-react';
import clsx from 'clsx';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'px-4 py-2 font-medium transition-colors duration-200 rounded-lg',
      isActive
        ? 'text-primary-500 bg-primary-50'
        : 'text-neutral-600 hover:text-primary-500 hover:bg-primary-50'
    );

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-primary-500">
          <BriefcaseBusiness size={28} />
          <span className="text-xl font-bold">JobHub</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLink to="/" className={navLinkClasses} end>
            Job Listings
          </NavLink>
          <NavLink to="/applied" className={navLinkClasses}>
            My Applications
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-700 hover:text-primary-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
            <nav className="flex flex-col p-4">
              <NavLink to="/" className={navLinkClasses} end>
                Job Listings
              </NavLink>
              <NavLink to="/applied" className={navLinkClasses}>
                My Applications
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;