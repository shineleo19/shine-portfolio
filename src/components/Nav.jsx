import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Shine', href: '/', key: 'home' },
  { label: 'Projects', href: '/projects', key: 'projects' },
  { label: 'Watching', href: '/watching', key: 'writing' },
  { label: 'Reading', href: '/reading', key: 'reading' },
  { label: 'Hobbies', href: '/hobbies', key: 'hobbies' },
];

const EXTERNAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/shineleo19', key: 'github' },
  { label: 'Twitter', href: 'https://twitter.com/shineleo19', key: 'twitter' },
  { label: 'CV', href: '/cv.pdf', key: 'cv' },
];

const MotionLink = motion(Link);

export default function Nav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.header
      style={{
        ...styles.header,
        top: isCompact ? '12px' : '24px',
        padding: isCompact ? '0 12px' : '0 48px',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── LEFT SIDE: Liquid Glass Pill ── */}
      <motion.div
        style={{
          ...styles.navPill,
          gap: isCompact ? '12px' : '24px',
          padding: isCompact ? '8px 12px' : '10px 20px',
          borderRadius: isCompact ? '10px' : '12px',
        }}
        initial={false}
        animate={{
          // Turns highly transparent on scroll
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 1)',
          // Adds heavy blur and bumps saturation for the "liquid/glass" look
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(0px) saturate(100%)',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(0px) saturate(100%)',
          // Subtle white border creates a glass edge
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <MotionLink
              key={link.key}
              to={link.href}
              style={{
                ...styles.navLink,
                fontSize: isCompact ? '12px' : '14px',
                color: isActive ? '#111' : '#888',
                fontWeight: isActive ? 500 : 400,
                '--line-color': isActive ? '#111' : '#888',
              }}
              whileHover={{ color: '#111' }}
              transition={{ duration: 0.2 }}
              className="highlight-text"
            >
              {link.label}
            </MotionLink>
          );
        })}
      </motion.div>

      {/* ── RIGHT SIDE: Fades out on scroll ── */}
      <motion.div 
        style={{
          ...styles.externalGroup,
          display: isCompact ? 'none' : 'flex',
        }}
        initial={false}
        animate={{
          opacity: scrolled ? 0 : 1,
          // Moves up slightly as it fades out for a smoother exit
          y: scrolled ? -10 : 0, 
          // Disables clicks when hidden so you don't accidentally click invisible links
          pointerEvents: scrolled ? 'none' : 'auto', 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {EXTERNAL_LINKS.map((link) => (
          <motion.a
            key={link.key}
            href={link.href}
            style={{
              ...styles.externalLink,
              fontSize: isCompact ? '12px' : '14px',
              '--line-color': '#111',
            }}
            initial={{ opacity: 0.6, color: '#888' }}
            whileHover={{ opacity: 1, color: '#111' }}
            transition={{ duration: 0.2 }}
            className="highlight-text"
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    </motion.header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: '24px',
    left: '0px', 
    right: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    padding: '0 48px', 
    pointerEvents: 'none', 
  },

  navPill: {
    pointerEvents: 'auto', 
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '10px 20px',
    borderRadius: '12px', // Slightly rounder borders often look better with glassmorphism
  },

  navLink: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    textDecoration: 'none',
  },

  externalGroup: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },

  externalLink: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    textDecoration: 'none',
  },
};