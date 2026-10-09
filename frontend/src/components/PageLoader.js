import { useEffect, useRef, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import './PageLoader.css';

const MAX_WAIT_MS = 10000;
const PRE_DELAY_MS = 500;
const POST_DELAY_MS = 500;

function PageLoader() {
  const location = useLocation();
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);

    let cancelled = false;
    const cleanupFns = [];

    const timeoutId = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, PRE_DELAY_MS + MAX_WAIT_MS);

    const finish = () => {
      if (cancelled) return;
      clearTimeout(timeoutId);
      setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, POST_DELAY_MS);
    };

    const preDelayId = setTimeout(() => {
      const frame = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const media = Array.from(container.querySelectorAll('img, video'));
        const total = media.length;

        if (total === 0) {
          finish();
          return;
        }

        let loadedCount = 0;
        const markLoaded = () => {
          loadedCount += 1;
          setProgress(Math.round((loadedCount / total) * 100));
          if (loadedCount >= total) {
            finish();
          }
        };

        media.forEach((el) => {
          const isVideo = el.tagName === 'VIDEO';
          const isReady = isVideo ? el.readyState >= 2 : el.complete;

          if (isReady) {
            markLoaded();
            return;
          }

          const eventName = isVideo ? 'loadeddata' : 'load';
          el.addEventListener(eventName, markLoaded, { once: true });
          el.addEventListener('error', markLoaded, { once: true });

          cleanupFns.push(() => {
            el.removeEventListener(eventName, markLoaded);
            el.removeEventListener('error', markLoaded);
          });
        });
      });

      cleanupFns.push(() => cancelAnimationFrame(frame));
    }, PRE_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      clearTimeout(preDelayId);
      cleanupFns.forEach((fn) => fn());
    };
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div className="page-loader-overlay">
          <div className="page-loader-bar-track">
            <div className="page-loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      <div ref={containerRef} style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Outlet />
      </div>
    </>
  );
}

export default PageLoader;
