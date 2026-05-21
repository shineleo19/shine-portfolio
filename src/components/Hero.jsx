import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section style={styles.heroWrapper}>
      <p style={styles.lineStyle}>
        Hey there, I'm <span  style={{ color: '#1a1a1a',fontFamily: "'oufale', Georgia, serif" ,fontSize: 'clamp(2rem, 3vw, 2.5rem)', pointerEvents: 'none'}}>Shine</span> 👋 Welcome to my{' '}
        <span style={styles.italicText}>digital garden</span> 🌱 I like building{' '}
        
        {/* 2. Change 'span' to 'Link' and add the 'to' prop for routing */}
        <Link to="/projects" className="highlight-text" style={{ '--line-color': '#00E5FF' ,fontFamily: "'oufale', Georgia, serif" ,fontSize: 'clamp(2rem, 3vw, 2.5rem)'}}>things</Link>, and I'm currently helping to build{' '}
        <a href="https://mobbin.com" target="_blank" rel="noopener noreferrer" className="wavy-link">Mobbin</a>.
      </p>

      <p style={styles.lineStyle}>
        In my free time, I enjoy brewing <Link to="/hobbies" className="highlight-text" style={{ '--line-color': '#FF9100' ,fontFamily: "'oufale', Georgia, serif" ,fontSize: 'clamp(2rem, 3vw, 2.5rem)'}}>coffee</Link>, 
        tending to my <Link to="/hobbies" className="highlight-text" style={{ '--line-color': '#00E676' ,fontFamily: "'oufale', Georgia, serif" ,fontSize: 'clamp(2rem, 3vw, 2.5rem)'}}>plants</Link>, and{' '}
        <Link to="/hobbies" className="highlight-text" style={{ '--line-color': '#D500F9' ,fontFamily: "'oufale', Georgia, serif" ,fontSize: 'clamp(2rem, 3vw, 2.5rem)'}}>climbing</Link> (plastic) rocks.
      </p>

      <p style={styles.lineStyle}>
        I do some <Link to="/reading" className="highlight-text" style={{ '--line-color': '#2979FF' ,fontFamily: "'oufale', Georgia, serif" ,fontSize: 'clamp(2rem, 3vw, 2.5rem)'}}>reading</Link> and{' '}
        <Link to="/watching" className="highlight-text" style={{ '--line-color': '#FFEA00' ,fontFamily: "'oufale', Georgia, serif" ,fontSize: 'clamp(2rem, 3vw, 2.5rem)'}}>watching</Link> as well, albeit not as consistently, 
        but I'm working on being better at that.
      </p>
    </section>
  );
}

const styles = {
  heroWrapper: {
    paddingTop: 'clamp(16px, 5vw, 20px)',
    maxWidth: '100%',
    margin: '0 auto',
    paddingBottom: 'clamp(24px, 5vw, 40px)',
    paddingLeft: 'clamp(16px, 5vw, 24px)',
    paddingRight: 'clamp(16px, 5vw, 24px)',
  },
  lineStyle: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 'clamp(1.1rem, 2.5vw, 2.2rem)',
    lineHeight: 1.2,
    color: '#a3a3a3',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
  },
  italicText: {
    fontStyle: 'italic',
    color: '#a3a3a3',
  }
};