import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MasonryFeed from './components/MasonryFeed'; 
import ProjectsPage from './components/ProjectsPage';
import ReadingPage from './components/ReadingPage';
import WatchingPage from './components/WatchingPage';
import HobbiesPage from './components/HobbiesPage';

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <main style={mainStyle}>
        {/* We removed the rigid left/right grid! Just a single wrapper now. */}
        <div style={layoutStyle}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Routes location={location}>
                <Route path="/" element={<MasonryFeed page="home" />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/watching" element={<WatchingPage />} />
                <Route path="/reading" element={<ReadingPage />} />
                <Route path="/hobbies" element={<HobbiesPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const mainStyle = {
  minHeight: '100vh',
  paddingTop: 'clamp(60px, 10vw, 100px)',
};

const layoutStyle = {
  maxWidth: '97%',
  margin: '0 auto',
  padding: 'clamp(12px, 4vw, 24px)',
};