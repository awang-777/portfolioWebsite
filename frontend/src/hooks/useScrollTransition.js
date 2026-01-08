import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const COOLDOWN_PERIOD = 800;
const THROTTLE_DELAY = 100;

/**
 * Custom hook for handling scroll transitions between pages
 * @param {Object} config 
 * @param {string} config.currentPath 
 * @param {Object} config.transitions 
 * @param {string} config.transitions.scrollDown 
 * @param {string} config.transitions.scrollUp 
 */
export function useScrollTransition(config) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPath, transitions } = config;

  useEffect(() => {
    let scrollTimeout = null;
    let lastScrollTime = 0;
    let isTransitioning = false;

    function handleWheel(event) {
      if (isTransitioning) return;
      
      const now = Date.now();
      
      if (now - lastScrollTime < COOLDOWN_PERIOD) {
        return;
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (location.pathname !== currentPath) return;

        const scrollDown = event.deltaY > 0;
        const scrollUp = event.deltaY < 0;

        if (scrollDown && transitions.scrollDown) {
          isTransitioning = true;
          lastScrollTime = Date.now();
          navigate(transitions.scrollDown);
          
          setTimeout(() => {
            isTransitioning = false;
          }, COOLDOWN_PERIOD);
        } else if (scrollUp && transitions.scrollUp) {
          isTransitioning = true;
          lastScrollTime = Date.now();
          navigate(transitions.scrollUp);
          
          setTimeout(() => {
            isTransitioning = false;
          }, COOLDOWN_PERIOD);
        }
      }, THROTTLE_DELAY);
    }

    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [navigate, location.pathname, currentPath, transitions.scrollDown, transitions.scrollUp]);
}

