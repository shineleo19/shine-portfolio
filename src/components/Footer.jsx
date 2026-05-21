import { useState } from 'react';
import { SITE } from '../data/site';

export default function Footer() {
  const [leafHovered, setLeafHovered] = useState(false);

  return (
    <footer style={footerStyle}>
      <div
        onMouseEnter={() => setLeafHovered(true)}
        onMouseLeave={() => setLeafHovered(false)}
        style={{
          position: 'relative',
          width: '70px',
          height: '70px',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
        }}
      >
        <img
          src="/download.gif"
          alt="Hover leaf animation"
          style={{
            position: 'absolute',
            inset: '-12px',
            width: 'calc(100% + 18px)',
            height: 'calc(100% + 18px)',
            objectFit: 'contain',
            pointerEvents: 'none',
            opacity: leafHovered ? 1 : 0,
            transform: leafHovered ? 'scale(1.22)' : 'scale(0.88)',
            transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
          }}
        />
        <span
          style={{
            position: 'absolute',
            fontSize: '28px',
            display: 'inline-block',
            opacity: leafHovered ? 0 : 1,
            transition: 'opacity 0.18s ease-out',
          }}
        >
          <img src="favicon.jpg" alt="" srcset="" />
        </span>
      </div>

      <p style={textStyle}>Planted by {SITE.name}</p>
    </footer>
  );
}

const footerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '60px 0 48px',
  marginTop: '32px',
};

const textStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: '12px',
  color: '#bbb',
  letterSpacing: '0.05em',
};
