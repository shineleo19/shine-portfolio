import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProjectCard, HobbyCard, BookCard, SkillsCard, ContactCard } from './Cards';
import { PROJECTS, HOBBIES, BOOKS, SKILLS, CONTACT } from '../data/site';

/* ─── Animated reveal wrapper ─── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section anchor wrapper ─── */
function Section({ id, children }) {
  return (
    <section id={id} style={{ display: 'contents' }}>
      {children}
    </section>
  );
}

/*
  chester.how uses a CSS masonry-style layout:
  - Two columns of unequal width
  - Cards stacked vertically per column
  - Items interleaved across left/right columns as you scroll
  We replicate this with two independent column arrays.
*/

export default function Feed() {
  // Build feed items — interleaved exactly as chester.how does it
  const leftCol = [
    // Row 1 left — project
    <Section key="proj-0" id="projects">
      <Reveal delay={0.05}>
        <ProjectCard project={PROJECTS[0]} />
      </Reveal>
    </Section>,

    // Row 2 left — project
    <Reveal key="proj-2" delay={0.05}>
      <ProjectCard project={PROJECTS[2]} />
    </Reveal>,

    // Row 3 left — hobby photo (film/photo)
    <Section key="hobby-0" id="hobbies">
      <Reveal delay={0.05}>
        <HobbyCard hobby={HOBBIES[0]} />
      </Reveal>
    </Section>,

    // Row 4 left — book
    <Section key="book-0" id="reading">
      <Reveal delay={0.05}>
        <BookCard book={BOOKS[0]} />
      </Reveal>
    </Section>,

    // Row 5 left — project
    <Reveal key="proj-4" delay={0.05}>
      <ProjectCard project={PROJECTS[4]} />
    </Reveal>,

    // Row 6 left — hobby
    <Reveal key="hobby-2" delay={0.05}>
      <HobbyCard hobby={HOBBIES[2]} />
    </Reveal>,

    // Row 7 left — skills
    <Section key="skills" id="skills">
      <Reveal delay={0.05}>
        <SkillsCard skills={SKILLS} />
      </Reveal>
    </Section>,
  ];

  const rightCol = [
    // Row 1 right — project (taller, starts at same level)
    <Reveal key="proj-1" delay={0.1}>
      <ProjectCard project={PROJECTS[1]} />
    </Reveal>,

    // Row 2 right — hobby
    <Reveal key="hobby-1" delay={0.1}>
      <HobbyCard hobby={HOBBIES[1]} />
    </Reveal>,

    // Row 3 right — book
    <Reveal key="book-1" delay={0.1}>
      <BookCard book={BOOKS[1]} />
    </Reveal>,

    // Row 4 right — project
    <Reveal key="proj-3" delay={0.1}>
      <ProjectCard project={PROJECTS[3]} />
    </Reveal>,

    // Row 5 right — book
    <Reveal key="book-2" delay={0.1}>
      <BookCard book={BOOKS[2]} />
    </Reveal>,

    // Row 6 right — book
    <Reveal key="book-3" delay={0.1}>
      <BookCard book={BOOKS[3]} />
    </Reveal>,

    // Row 7 right — contact
    <Section key="contact" id="contact">
      <Reveal delay={0.1}>
        <ContactCard contact={CONTACT} />
      </Reveal>
    </Section>,
  ];

  return (
    <div style={feedStyle}>
      {/* Left column */}
      <div style={colStyle}>
        {leftCol.map((item, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            {item}
          </div>
        ))}
      </div>

      {/* Right column */}
      <div style={{ ...colStyle, paddingTop: '48px' }}>
        {rightCol.map((item, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

const feedStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
  alignItems: 'start',
  marginTop: '48px',
};

const colStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
};
