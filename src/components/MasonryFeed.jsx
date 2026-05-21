import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProjectCard, HobbyCard, BookCard, HobbyPhotoCard, HobbyPlantCard } from './Cards';
import { fetchBooks, fetchProjects, fetchHobbies, fetchHobbyPhotos } from '../data/api';
import Hero from './Hero';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';

function getProjectPreviewType(project) {
  const rawType = (project?.projectType || project?.previewType || project?.type || 'website').toString().trim().toLowerCase();
  return rawType === 'app' || rawType === 'mobile' || rawType === 'mobile-app' ? 'app' : 'website';
}

function getHobbyPhotoSize(photo) {
  const size = (photo?.size || '').toString().trim().toLowerCase();
  return size === 'landscape' || size === 'portrait' ? size : null;
}

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

export default function MasonryFeed({ page }) {
  const [projects, setProjects] = useState([]);
  const [books, setBooks] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [hobbyPhotos, setHobbyPhotos] = useState([]);
  const randomCardsRef = useRef(null);
  const columns = useResponsiveColumns();

  // Generate 18 fixed mixed cards (projects prioritized but interleaved with other types)
  const generateRandomCards = () => {
    // Only generate if we haven't already or if we have valid data
    if (randomCardsRef.current && randomCardsRef.current.length > 0) {
      return randomCardsRef.current;
    }

    // Don't generate if we don't have any data yet
    if (projects.length === 0 && books.length === 0 && hobbies.length === 0 && hobbyPhotos.length === 0) {
      return [];
    }

    const projectCards = projects.map(p => ({ type: 'project', data: p }));
    const photoCards = hobbyPhotos.map(p => ({ type: p.type || 'hobbyPhoto', data: p }));
    const bookCards = books.map(b => ({ type: 'book', data: b }));
    const hobbyCards = hobbies.map(h => ({ type: 'hobby', data: h }));

    const mixedCards = [];
    let pIdx = 0, phIdx = 0, bIdx = 0, hIdx = 0;

    // Mix cards in a pattern: project, photo, project, book, hobby, project, etc.
    // This ensures no long runs of the same type
    const pattern = ['project', 'photo', 'project', 'book', 'hobby', 'project'];
    let patternIdx = 0;

    while (mixedCards.length < 18) {
      const type = pattern[patternIdx % pattern.length];

      if (type === 'project' && pIdx < projectCards.length) {
        mixedCards.push(projectCards[pIdx++]);
      } else if (type === 'photo' && phIdx < photoCards.length) {
        mixedCards.push(photoCards[phIdx++]);
      } else if (type === 'book' && bIdx < bookCards.length) {
        mixedCards.push(bookCards[bIdx++]);
      } else if (type === 'hobby' && hIdx < hobbyCards.length) {
        mixedCards.push(hobbyCards[hIdx++]);
      } else {
        // If we run out of a type, try the next type in pattern
        let nextType = null;
        for (let i = 1; i < pattern.length; i++) {
          const tryType = pattern[(patternIdx + i) % pattern.length];
          if (tryType === 'project' && pIdx < projectCards.length) {
            nextType = 'project';
            break;
          } else if (tryType === 'photo' && phIdx < photoCards.length) {
            nextType = 'photo';
            break;
          } else if (tryType === 'book' && bIdx < bookCards.length) {
            nextType = 'book';
            break;
          } else if (tryType === 'hobby' && hIdx < hobbyCards.length) {
            nextType = 'hobby';
            break;
          }
        }

        if (nextType === 'project' && pIdx < projectCards.length) {
          mixedCards.push(projectCards[pIdx++]);
        } else if (nextType === 'photo' && phIdx < photoCards.length) {
          mixedCards.push(photoCards[phIdx++]);
        } else if (nextType === 'book' && bIdx < bookCards.length) {
          mixedCards.push(bookCards[bIdx++]);
        } else if (nextType === 'hobby' && hIdx < hobbyCards.length) {
          mixedCards.push(hobbyCards[hIdx++]);
        } else {
          break;
        }
      }

      patternIdx++;
    }

    // If still less than 18, fill remaining with any available cards
    while (mixedCards.length < 18) {
      if (pIdx < projectCards.length) {
        mixedCards.push(projectCards[pIdx++]);
      } else if (phIdx < photoCards.length) {
        mixedCards.push(photoCards[phIdx++]);
      } else if (bIdx < bookCards.length) {
        mixedCards.push(bookCards[bIdx++]);
      } else if (hIdx < hobbyCards.length) {
        mixedCards.push(hobbyCards[hIdx++]);
      } else {
        break;
      }
    }

    const fixedCards = mixedCards.slice(0, 18);
    randomCardsRef.current = fixedCards;
    return fixedCards;
  };

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([fetchProjects(), fetchBooks(), fetchHobbies(), fetchHobbyPhotos()]).then(([projectsResult, booksResult, hobbiesResult, photosResult]) => {
      if (!mounted) {
        return;
      }

      if (projectsResult.status === 'fulfilled' && Array.isArray(projectsResult.value) && projectsResult.value.length > 0) {
        setProjects(projectsResult.value);
      }

      if (booksResult.status === 'fulfilled' && Array.isArray(booksResult.value) && booksResult.value.length > 0) {
        setBooks(booksResult.value);
      }

      if (hobbiesResult.status === 'fulfilled' && Array.isArray(hobbiesResult.value) && hobbiesResult.value.length > 0) {
        setHobbies(hobbiesResult.value);
      }

      if (photosResult.status === 'fulfilled' && Array.isArray(photosResult.value) && photosResult.value.length > 0) {
        const formattedPhotos = photosResult.value.map(photo => ({
          type: photo.category && photo.category.toLowerCase().includes('plant') ? 'plant' : 'hobbyPhoto',
          id: photo.id,
          title: photo.title,
          category: photo.category,
          imageUrl: photo.imageUrl,
          size: photo.size || null,
          tag: photo.category,
          sortOrder: photo.sortOrder
        }));
        setHobbyPhotos(formattedPhotos);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  let itemsToRender = [];
  let itemIndex = 0;
  
  if (page === 'home') {
    const heroSpan = columns >= 2 ? 2 : 1;

    // Add Hero
    itemsToRender.push({ key: `hero`, component: <Hero />, type: 'hero', itemIndex: itemIndex++, spanColumns: heroSpan });
    
    // Generate and add 18 random cards
    const randomCards = generateRandomCards();
    const usedHomeIds = new Set();

    randomCards.forEach((card, idx) => {
      const cardId = `${card.type}:${card.data?.id || card.data?.title || idx}`;
      usedHomeIds.add(cardId);

      if (card.type === 'project') {
        const isMobileAppProject = getProjectPreviewType(card.data) === 'app';
        const projectSpan = isMobileAppProject ? 1 : (columns >= 4 ? 2 : 1);
        itemsToRender.push({
          key: `random-p${idx}`,
          component: <ProjectCard project={card.data} />,
          type: 'project',
          itemIndex: itemIndex++,
          spanColumns: projectSpan
        });
      } else if (card.type === 'book') {
        itemsToRender.push({
          key: `random-b${idx}`,
          component: <BookCard book={card.data} />,
          type: 'book',
          itemIndex: itemIndex++
        });
      } else if (card.type === 'hobby') {
        itemsToRender.push({
          key: `random-h${idx}`,
          component: <HobbyCard hobby={card.data} />,
          type: 'hobby',
          itemIndex: itemIndex++
        });
      } else if (card.type === 'hobbyPhoto') {
        const photoSize = getHobbyPhotoSize(card.data);
        itemsToRender.push({
          key: `random-hp${idx}`,
          component: <HobbyPhotoCard hobby={card.data} />,
          type: 'photo',
          itemIndex: itemIndex++,
          spanColumns: photoSize === 'landscape' && columns >= 3 ? 2 : 1
        });
      } else if (card.type === 'plant') {
        itemsToRender.push({
          key: `random-plant${idx}`,
          component: <HobbyPlantCard item={card.data} />,
          type: 'plant',
        });
      }
    });

    // Backfill remaining row slots with compact 1-column cards to avoid empty spaces.
    if (columns > 1) {
      const appProjectFillers = projects
        .filter((project, idx) => {
          const isApp = getProjectPreviewType(project) === 'app';
          const key = `project:${project?.id || project?.title || idx}`;
          return isApp && !usedHomeIds.has(key);
        })
        .map((project, idx) => ({
          key: `fill-app-${idx}`,
          component: <ProjectCard project={project} />,
          type: 'project',
          spanColumns: 1,
        }));

      const portraitPhotoFillers = hobbyPhotos
        .filter((photo, idx) => {
          const isPhoto = (photo?.type || '').toLowerCase() === 'hobbyphoto';
          const key = `${photo?.type || 'hobbyPhoto'}:${photo?.id || photo?.title || idx}`;
          return isPhoto && !usedHomeIds.has(key);
        })
        .map((photo, idx) => ({
          key: `fill-photo-${idx}`,
          component: <HobbyPhotoCard hobby={photo} />,
          type: 'photo',
          spanColumns: 1,
        }));

      const bookFillers = books
        .filter((book, idx) => {
          const key = `book:${book?.id || book?.title || idx}`;
          return !usedHomeIds.has(key);
        })
        .map((book, idx) => ({
          key: `fill-book-${idx}`,
          component: <BookCard book={book} />,
          type: 'book',
          spanColumns: 1,
        }));

      const fillerPool = [...appProjectFillers, ...portraitPhotoFillers, ...bookFillers];
      const usedSpan = itemsToRender.reduce((sum, item) => sum + Math.min(item.spanColumns || 1, columns), 0);
      const remainder = usedSpan % columns;
      let neededSlots = remainder === 0 ? 0 : columns - remainder;

      for (let idx = 0; idx < fillerPool.length && neededSlots > 0; idx++) {
        const filler = fillerPool[idx];
        itemsToRender.push({
          ...filler,
          key: `${filler.key}-${idx}`,
          itemIndex: itemIndex++,
        });
        neededSlots -= 1;
      }
    }
  } else if (page === 'projects') {
    itemsToRender = [
      { key: 'title', component: <div style={{ paddingBottom: '40px' }}>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0 }}>projects.</h1>
        <p style={{ color: '#666', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>Things I've built...</p>
      </div>, type: 'text', itemIndex: itemIndex++ },
      ...projects.map((project, idx) => ({
        key: `p${idx}`,
        component: <ProjectCard project={project} />,
        type: 'project',
        itemIndex: itemIndex++
      }))
    ];
  }

  return (
    <div style={{
      ...masonryGridStyle,
      gridTemplateColumns: `repeat(${columns}, 1fr)`
    }}>
      {itemsToRender.map((item) => {
        const spanColumns = Math.min(item.spanColumns || 1, columns);
        const itemStyle = {
          ...masonryItemStyle,
          ...(spanColumns > 1 ? { gridColumn: `span ${spanColumns}` } : {})
        };

        return (
          <div key={item.key} style={itemStyle}>
            <Reveal delay={item.itemIndex * 0.05}>
              {item.component}
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}

const masonryGridStyle = {
  display: 'grid',
  gridAutoFlow: 'dense',
  gap: 'clamp(6px, 1.6vw, 10px)',
  width: '100%',
  padding: 'clamp(2px, 1vw, 8px)',
};

const masonryItemStyle = {
  width: '100%',
};