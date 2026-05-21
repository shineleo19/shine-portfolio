import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ─── Card Label (top-left section/title label) ─── */
export function CardLabel({ children, href }) {
  return (
    <div style={labelStyle}>
      {href ? (
        <a href={href} style={{ color: '#999', textDecoration: 'none' }}>{children}</a>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
}

const labelStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: '11px',
  color: '#999',
  letterSpacing: '0.02em',
  marginBottom: '10px',
  display: 'block',
};

/* ─── Arrow link (top-right ↗ on cards) ─── */
export function ArrowLink({ href, tooltipText = "View project" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: -8, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: 'absolute',
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#000',
              color: '#fff',
              padding: '7px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              marginRight: '8px'
            }}
          >
            {tooltipText}
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: hovered ? '#f0f0f0' : 'transparent',
          color: hovered ? '#000' : '#ccc',
          transition: 'all 0.2s ease',
          textDecoration: 'none',
        }}
      >
        <span style={{ fontSize: '16px' }}>↗</span>
      </a>
    </div>
  );
}

/* ─── Movie / Watching Card ─── */
export function MovieCard({ item }) {
  const [hovered, setHovered] = useState(false);

  if (!item) return null;

  return (
    <Card 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#101010', height: '320px', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ padding: '16px 16px 0' }}>
        <CardLabel>{item.kind === 'series' ? 'Watching · Series' : 'Watching · Movie'}</CardLabel>
      </div>
      
      <ArrowLink href={item.href} tooltipText="View on IMDB" />

      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          display: 'block',
          position: 'relative',
          marginTop: '12px',
          overflow: 'hidden',
        }}
      >
        {item.posterUrl ? (
          <motion.img
            src={item.posterUrl}
            alt={item.title}
            animate={{ scale: hovered ? 1.01 : 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              aspectRatio: '2 / 3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'DM Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.04em',
              background: '#2a2a2a',
            }}
          >
            NO POSTER
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.86) 18%, rgba(0,0,0,0.28) 48%, rgba(0,0,0,0.08) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: '16px',
            right: '16px',
            bottom: '16px',
            zIndex: 2,
          }}
        >
          <div style={{
            background: item.status === 'WATCHING' ? '#dbeafe' : '#e5e7eb',
            color: item.status === 'WATCHING' ? '#1e3a8a' : '#374151',
            fontSize: '10px',
            fontWeight: '700',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            fontFamily: "'DM Mono', monospace",
            marginBottom: '10px',
          }}>
            {item.status}
          </div>

          <h3 style={{
            fontFamily: "'Lora', serif",
            fontSize: '1.15rem',
            margin: 0,
            color: '#fff',
            fontWeight: 500,
            lineHeight: 1.25,
          }}>
            {item.title}
          </h3>

          <p style={{
            margin: '6px 0 0',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.82)',
            fontFamily: "'Lora', serif",
          }}>
            {item.director ? `Directed by ${item.director}` : `Released ${item.year || 'N/A'}`}
          </p>
        </div>
      </a>
    </Card>
  );
}

/* ─── Base Card wrapper ─── */
export function Card({
  children,
  href,
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave,
  hoverLift = -2,
  hoverShadow,
}) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onMouseLeave?.();
  };

  return (
    <motion.div
      style={{
        ...cardBase,
        ...style,
        transform: hovered ? `translateY(${hoverLift}px)` : 'translateY(0)',
        boxShadow: hovered ? (hoverShadow || style.boxShadow || 'none') : (style.boxShadow || 'none'),
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        cursor: href || onClick ? 'pointer' : 'default',
        position: 'relative',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

const cardBase = {
  background: '#fafafa',
  borderRadius: '12px',
  overflow: 'hidden',
};

function getProjectPreviewType(project) {
  const rawType = (project?.projectType || project?.previewType || project?.type || 'website').toString().trim().toLowerCase();
  return rawType === 'app' || rawType === 'mobile' || rawType === 'mobile-app' ? 'app' : 'website';
}

function WebsitePreview({ project }) {
  if (project.imageUrl) {
    return (
      <motion.img
        src={project.imageUrl}
        alt={project.title}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'center',
          background: '#fff',
          borderRadius: '6px',
        }}
      />
    );
  }

  return (
    <motion.div
      style={{
        background: '#f3f3f3',
        padding: '120px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '1.5rem',
          color: 'rgba(0,0,0,0.1)',
          letterSpacing: '-0.04em',
          textAlign: 'center',
        }}
      >
        {project.title}
      </span>
    </motion.div>
  );
}

function MobileAppPreview({ project, hovered }) {
  const imageScale = hovered ? 1.02 : 1;
  const imageRotate = hovered ? '-8deg' : '-6deg';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
      }}
    >

      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          style={{
            width: '70%',
            aspectRatio: '9 / 19.5',
            height: 'auto',
            maxHeight: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'center',
            background: 'transparent',
            borderRadius: '24px',
            transform: `rotate(${imageRotate}) scale(${imageScale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.28s ease',
            boxShadow: '0 7px 20px rgba(0,0,0,0.70)',
          }}
        />
      ) : (
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.72rem',
            color: 'rgba(0,0,0,0.38)',
            letterSpacing: '0.02em',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {project.title}
        </div>
      )}
    </div>
  );
}

/* ─── Project Card ─── */
export function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  
  if (!project) return null;

  const previewType = getProjectPreviewType(project);
  const isMobileApp = previewType === 'app';
  const websiteFramePadding = 'clamp(10px, 2.6vw, 30px)';

  return (
    <Card 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      hoverLift={0}
      hoverShadow="none"
      style={{
        height: 'clamp(240px, 46vw, 320px)',
        display: 'flex',
        flexDirection: 'column',
        background: isMobileApp ? 'transparent' : '#f3f3f3',
        ...(isMobileApp ? { width: '100%', boxShadow: 'none' } : {})
      }}
    >
      {/* ── Top Section: Just the Label ── */}
      <div style={{ padding: '16px 16px 10px' }}>
        <CardLabel>Projects · {project.title}</CardLabel>
      </div>
      
      {/* Tooltip Arrow */}
      <ArrowLink href={project.href} />

      {/* ── Image Section ── */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textDecoration: 'none',
          padding: isMobileApp ? '12px 16px 14px' : `${websiteFramePadding}`,
          flex: 1,
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            height: '100%',
            borderRadius: '10px',
            border: isMobileApp ? 'none' : '1px solid #e5e5e5',
            background: isMobileApp ? 'transparent' : '#f3f3f3',
            padding: isMobileApp ? '0' : '10px',
            transform: hovered ? 'translateY(0) scale(1.03)' : 'translateY(0) scale(1)',
            boxShadow: isMobileApp ? 'none' : (hovered ? '0 10px 22px rgba(0,0,0,0.70)' : '0 10px 22px rgba(0,0,0,0.70)'),
            transition: 'transform 0.28s ease, box-shadow 0.28s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isMobileApp ? (
            <MobileAppPreview
              project={project}
              hovered={hovered}
            />
          ) : (
            <WebsitePreview
              project={project}
            />
          )}
        </div>
      </a>
    </Card>
  );
}

/* ─── Hobby / Photo Card ─── */
export function HobbyCard({ hobby }) {
  return (
    <Card style={{ height: '320px', display: 'flex', flexDirection: 'column' }}>
      <CardLabel>{hobby.label}</CardLabel>
      {hobby.imageUrl ? (
        <img
          src={hobby.imageUrl}
          alt={hobby.caption}
          style={{ width: '100%', flex: 1, objectFit: 'cover' }}
        />
      ) : (
        <div style={{
          background: hobby.bgGradient,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 40% 50%, rgba(255,255,255,0.06), transparent 65%)',
          }} />
          <span style={{ filter: 'grayscale(0.2)', fontSize: '3rem' }}>{hobby.icon}</span>
        </div>
      )}
      <div style={{
        padding: '10px 14px 14px',
        fontFamily: "'DM Mono', monospace",
        fontSize: '11px',
        color: '#aaa',
        letterSpacing: '0.02em',
      }}>
        {hobby.caption}
      </div>
    </Card>
  );
}
// Make sure you have this import at the top if you don't already:
// import { motion } from 'framer-motion';

/* ─── Hobby Photo Card (Pull Down Reveal) ─── */
export function HobbyPhotoCard({ hobby, onImageLoad }) {
  const [hovered, setHovered] = useState(false);

  if (!hobby) return null;

  const handleImageLoad = (e) => {
    const img = e.target;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    onImageLoad?.(isLandscape);
  };

  return (
    <Card 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        padding: 0, 
        height: '320px',
        width: '100%',
      }}
    >
      {/* TOP LABEL - HIDDEN BY DEFAULT, REVEAL ON HOVER */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          position: 'absolute', 
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '12px 16px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), transparent)',
          pointerEvents: 'none',
        }}
      >
        <CardLabel>Hobbies · {hobby.category || 'Photo'}</CardLabel>
      </motion.div>

      {/* IMAGE LAYER - PULLS DOWN ON HOVER */}
      <motion.div
        animate={{ 
          scale: hovered ? 1.05 : 1,
          y: hovered ? 40 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          zIndex: hovered ? 1 : 0,
          background: '#f0f0f0',
          borderRadius: '12px',
        }}
      >
        <img 
          src={hobby.imageUrl} 
          alt={hobby.title}
          onLoad={handleImageLoad}
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'block', 
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '12px',
          }} 
        />
      </motion.div>

      {/* BOTTOM TEXT OVERLAY - APPEARS ON HOVER */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          pointerEvents: 'none',
          padding: '16px',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7))',
        }}
      >
        {hobby.title && (
          <p style={{
            color: '#fff',
            fontSize: '13px',
            margin: 0,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: '0.02em',
          }}>
            {hobby.title}
          </p>
        )}
      </motion.div>
    </Card>
  );
}

/* ─── Hobby Plant/Coffee Card (Behind to Over Text) - CSS Transition Version ─── */
export function HobbyPlantCard({ item }) {
  const [hovered, setHovered] = useState(false);

  if (!item) return null;

  return (
    <Card 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        padding: '24px', 
        height: '320px',
        background: '#fff' 
      }}
    >
      <div style={{ top: '-0px', padding: '0 16px', zIndex: 10, fontSize: '11px', fontFamily: "'DM Mono', monospace", color: '#999', letterSpacing: '0.02em', background: '#fff' }}>
        Hobbies · Plant
      </div>

      {/* TEXT LAYER - MOVED TO BOTTOM */}
      <div 
        style={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: hovered ? 0 : 2, 
          pointerEvents: 'none',
          padding: '24px',
          background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.98))',
          opacity: hovered ? 0.15 : 1,
          transform: hovered ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, z-index 0s'
        }}
      >
        <div style={{ 
          background: '#e0f2fe', 
          color: '#0369a1', 
          display: 'inline-block', 
          padding: '4px 8px', 
          borderRadius: '4px', 
          fontSize: '10px', 
          fontFamily: "'DM Mono', monospace", 
          marginBottom: '12px',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          {item.tag || 'PLANT'}
        </div>
        <h3 style={{ 
          fontFamily: "'Lora', serif", 
          fontSize: '2rem', 
          margin: '0 0 12px 0', 
          color: '#1a1a1a',
          fontWeight: 400,
          lineHeight: 1.1,
        }}>
          {item.title}
        </h3>
      </div>

      {/* IMAGE LAYER */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%', 
          height: '100%',
          zIndex: hovered ? 3 : 0,
          transform: hovered ? 'scale(1.12) translateY(-15px)' : 'scale(1) translateY(0)',
          opacity: hovered ? 1 : 0.85,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out, z-index 0s'
        }}
      >
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center'
          }} 
        />
      </div>
    </Card>
  );
}

/* ─── Book Card (UPDATED - Horizontal Layout) ─── */
export function BookCard({ book }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const [coverIsLandscape, setCoverIsLandscape] = useState(false);

  if (!book) return null;

  const handleCoverLoad = (e) => {
    const img = e.target;
    setCoverIsLandscape(img.naturalWidth > img.naturalHeight);
  };

  return (
    <Card 
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      hoverLift={-6}
      hoverShadow="0 18px 32px rgba(0,0,0,0.12)"
      style={{ 
        height: '320px', 
        display: 'flex', 
        flexDirection: 'column',
        background: '#f2f2f2',
      }}
    >
      <div style={{ padding: '16px 16px 0' }}>
        <CardLabel>Reading · Books</CardLabel>
      </div>
      
      {/* THE ARROW (Tooltip is built-in here now) */}
      <ArrowLink href={book.href} tooltipText="View on Goodreads" />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: '24px',
          padding: '28px',
        }}
      >
        {/* LEFT: Book Cover */}
        <div style={{ flexShrink: 0, perspective: '800px' }}>
          <motion.div
            animate={{ 
              rotateY: isCardHovered ? -8 : 0, 
              rotateZ: isCardHovered ? 2 : 0,
              scale: isCardHovered ? 1.02 : 1
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              width: '130px', 
              position: 'relative',
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center', // Spins from the spine
              boxShadow: isCardHovered
                ? '0 16px 34px rgba(0,0,0,0.20)'
                : '0 10px 24px rgba(0,0,0,0.14)',
              borderRadius: '4px',
            }}
          >
            {book.coverUrl && !coverFailed ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                onLoad={handleCoverLoad}
                onError={() => setCoverFailed(true)}
                style={{
                  width: '100%',
                  aspectRatio: '2 / 3',
                  objectFit: coverIsLandscape ? 'contain' : 'cover',
                  objectPosition: 'center',
                  borderRadius: '2px 4px 4px 2px',
                  display: 'block',
                  background: '#ece8df',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '2 / 3',
                  borderRadius: '2px 4px 4px 2px',
                  background: 'linear-gradient(160deg, #ece8df, #ddd6c9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  textAlign: 'center',
                  color: '#7a7468',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '10px',
                  lineHeight: 1.4,
                }}
              >
                {book.title}
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT: Text Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'flex-end' }}>
          <div style={{
            background: book.status === 'READING' ? '#fdf1d6' : '#e8f5e9',
            color: book.status === 'READING' ? '#b98c28' : '#2e7d32',
            fontSize: '12px',
            fontWeight: '600',
            padding: '4px 4px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Lora', serif",
            alignSelf: 'flex-start',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            letterSpacing: '0.04em',
          }}>
            {book.status}
          </div>

          <h3 style={{ 
            fontFamily: "arial, sans-serif", 
            fontSize: '1.0rem', 
            margin: 0,
            color: '#1a1a1a',
            fontWeight: 500,
            lineHeight: 1.25
          }}>
            {book.title}
          </h3>

          <p style={{ 
            margin: 0, 
            fontSize: '1.0rem', 
            color: '#999',
            fontFamily: "'Lora', serif",
          }}>
            {book.author}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* ─── Contact Card ─── */
export function ContactCard({ contact }) {
  return (
    <Card style={{ padding: '22px 24px' }}>
      <CardLabel>Contact</CardLabel>
      <p style={{
        fontFamily: "'Lora', serif",
        fontSize: '0.9rem',
        color: '#666',
        lineHeight: 1.75,
        marginBottom: '18px',
      }}>
        {contact.message}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { icon: '✉', label: contact.email, href: `mailto:${contact.email}` },
          { icon: '⌥', label: 'GitHub', href: contact.github },
          { icon: '𝕏', label: 'Twitter', href: contact.twitter },
          { icon: 'in', label: 'LinkedIn', href: contact.linkedin },
        ].map(link => (
          <ContactLink key={link.label} {...link} />
        ))}
      </div>
    </Card>
  );
}

function ContactLink({ icon, label, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: "'DM Mono', monospace",
        fontSize: '13px',
        color: hovered ? '#1a1a1a' : '#555',
        textDecoration: 'none',
        transition: 'color 0.15s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        width: '20px',
        textAlign: 'center',
        color: '#bbb',
        fontSize: '13px',
        flexShrink: 0,
      }}>{icon}</span>
      <span style={{
        textDecoration: hovered ? 'underline' : 'none',
        textUnderlineOffset: '3px',
      }}>{label}</span>
    </a>
  );
}
