import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HobbyPhotoCard, HobbyPlantCard } from './Cards';
import { fetchHobbyPhotos } from '../data/api';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';


export default function HobbiesPage() {
  const [hobbyPhotos, setHobbyPhotos] = useState([]);
  const [landscapeIndices, setLandscapeIndices] = useState(new Set());
  const columns = useResponsiveColumns();

  useEffect(() => {
    let mounted = true;

    fetchHobbyPhotos().then((data) => {
      if (!mounted) return;
      
      if (Array.isArray(data) && data.length > 0) {
        // Convert API data to component format
        const formattedPhotos = data.map(photo => ({
          type: photo.category && photo.category.toLowerCase().includes('plant') ? 'plant' : 'photo',
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
    }).catch((err) => {
      console.error('Failed to fetch hobby photos:', err);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handlePhotoLoad = (index, isLandscape) => {
    setLandscapeIndices(prev => {
      const newSet = new Set(prev);
      if (isLandscape) {
        newSet.add(index);
      } else {
        newSet.delete(index);
      }
      return newSet;
    });
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.header}>
        <h1 style={pageStyles.title}>hobbies.</h1>
        <p style={pageStyles.subtitle}>
          Things I do when I'm not staring at a screen. Mostly keeping plants alive and taking photos.
        </p>
      </div>

      <div style={{ ...pageStyles.grid, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {hobbyPhotos.map((item, index) => {
          const isLandscape = item.size
            ? item.size === 'landscape'
            : landscapeIndices.has(index);
          const gridItemStyle = {
            ...pageStyles.gridItem,
            // Only photo cards can span 2 columns (when landscape)
            ...(item.type === 'photo' && isLandscape && columns >= 3 ? { gridColumn: 'span 2' } : {}),
          };
          
          return (
            <motion.div 
              key={item.id || index} 
              style={gridItemStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Renders the correct card based on the type property */}
              {item.type === 'photo' ? (
                <HobbyPhotoCard
                  hobby={item}
                  onImageLoad={(isLandscape) => {
                    if (!item.size) {
                      handlePhotoLoad(index, isLandscape);
                    }
                  }}
                />
              ) : item.type === 'plant' ? (
                <HobbyPlantCard item={item} />
              ) : (
                <HobbyPhotoCard
                  hobby={item}
                  onImageLoad={(isLandscape) => {
                    if (!item.size) {
                      handlePhotoLoad(index, isLandscape);
                    }
                  }}
                />
              )}
            </motion.div>
          );
        })}
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
    height: '320px',
    overflow: 'hidden',
  }
};