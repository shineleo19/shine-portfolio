import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './Cards'; 
import { fetchProjects } from '../data/api';
import { PROJECTS } from '../data/site';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';

function getProjectPreviewType(project) {
  const rawType = (project?.projectType || project?.previewType || project?.type || 'website').toString().trim().toLowerCase();
  return rawType === 'app' || rawType === 'mobile' || rawType === 'mobile-app' ? 'app' : 'website';
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(PROJECTS);
  const columns = useResponsiveColumns();

  useEffect(() => {
    let mounted = true;

    fetchProjects()
      .then((data) => {
        if (mounted && Array.isArray(data) && data.length > 0) {
          setProjects(data);
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
      
      {/* ── Header Section ── */}
      <div style={pageStyles.header}>
        <h1 style={pageStyles.title}>projects.</h1>
        <p style={pageStyles.subtitle}>
          I like building things. Here are a few things I've built thus far that I'm pretty pleased with. 
          Most, if not all of them, were built for fun.
        </p>
      </div>

      <div style={{ ...pageStyles.grid, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {projects.map((project, index) => (
          (() => {
            const isMobileAppProject = getProjectPreviewType(project) === 'app';
            const spanColumns = isMobileAppProject ? 1 : (columns >= 4 ? 2 : 1);

            return (
          <motion.div 
            key={project.id || index} 
            style={{
              ...pageStyles.gridItem,
              ...(spanColumns > 1 ? { gridColumn: `span ${spanColumns}` } : {}),
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
            );
          })()
        ))}
      </div>
      
    </div>
  );
}

// Layout styling
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
    fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
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