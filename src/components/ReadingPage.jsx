import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookCard } from './Cards'; 
import { BOOKS } from '../data/site';
import { fetchBooks } from '../data/api';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';

export default function ReadingPage(){
  const [books, setBooks] = useState(BOOKS);
  const columns = useResponsiveColumns();

  useEffect(() => {
    let mounted = true;

    fetchBooks()
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length > 0) {
          setBooks(data);
        }
      })
      .catch(() => {
        // Keep local fallback if API is unavailable.
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.header}>
        <h1 style={pageStyles.title}>reading.</h1>
        <p style={pageStyles.subtitle}>
          What I'm reading, what I've read and what I hope to read next. Recommendations are always welcome!
        </p>
      </div>
      <div style={{ ...pageStyles.grid, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {books.map((book, index) => (
          <motion.div 
            key={book.id || index} 
            style={pageStyles.gridItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
          <BookCard book={book} />
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}

const pageStyles = {
  container: {
    paddingTop: 'clamp(12px, 3vw, 20px)',
    paddingBottom: 'clamp(40px, 8vw, 80px)',
  },
  header: {
    marginBottom: 'clamp(24px, 5vw, 48px)',
  },
  title: {
    fontFamily: "'Oufale', Georgia, serif",
    fontSize: 'clamp(4rem, 6vw, 5.0rem)', 
    fontWeight: 400,
    color: '#1a1a1a',
    margin: '0 0 16px 0',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: 'clamp(0.95rem, 2.2vw, 1.1rem)',
    color: '#666',
    maxWidth: '700px',
    lineHeight: 1.6,
    margin: 0,
  },
  grid: {
    display: 'grid',
    gap: 'clamp(4px, 2vw, 8px)',
    width: '100%',
  },
  gridItem: {
    width: '100%',
  }
};