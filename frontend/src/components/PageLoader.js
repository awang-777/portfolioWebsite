import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { getPendingState, subscribePending } from './loadingRegistry';
import './PageLoader.css';

const MAX_WAIT_MS = 20000;
const PRE_DELAY_MS = 500;
const POST_DELAY_MS = 500;

// Scrolling is handled below once each page is revealed; stop the browser from
// jumping back to the old position on refresh before that
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function PageLoader() {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isReload = useRef(
    performance.getEntriesByType('navigation')[0]?.type === 'reload'
  );
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    // A new page starts at the top; 'instant' skips the smooth scrolling set in index.css
    window.scrollTo({ top: 0, behavior: 'instant' });

    let cancelled = false;
    const cleanupFns = [];

    const timeoutId = setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, PRE_DELAY_MS + MAX_WAIT_MS);

    let mediaDone = false;
    let pendingDone = getPendingState().count === 0;

    // Total/doneCount combine both DOM media (img/video) and registered
    // async items (e.g. a Three.js GLB load) into one progress fraction,
    // set once scanning begins so the bar actually reflects everything
    // the page is waiting on, not just img/video tags.
    let total = 0;
    let doneCount = 0;
    let lastPendingCount = 0;
    // In-flight pending items contribute their partial progress too.
    let pendingFractionSum = 0;
    const renderProgress = () => {
      if (total > 0) {
        setProgress(Math.round(((doneCount + pendingFractionSum) / total) * 100));
      }
    };
    const bumpProgress = () => {
      doneCount += 1;
      renderProgress();
    };

    // mediaDone/pendingDone are latched true by one-time "ready" events
    // (img load, video canplaythrough, registry resolve) — that's already
    // the real readiness check. This pause is just a cosmetic debounce
    // before reveal, not a second check: re-reading a video's live
    // readyState here would false-positive on normal loop-restart dips.
    const finish = () => {
      if (cancelled || !mediaDone || !pendingDone) return;
      clearTimeout(timeoutId);
      // Show a full bar before reveal even if everything resolved before
      // the scan began (e.g. cached assets), when total is still 0.
      setProgress(100);
      setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, POST_DELAY_MS);
    };

    const unsubscribePending = subscribePending(({ count, fractionSum }) => {
      // Count each individual resolution since the scan started (not just
      // whether we've hit zero), so the bar credits pending items too.
      const resolvedSinceLast = Math.max(0, lastPendingCount - count);
      doneCount += resolvedSinceLast;
      pendingFractionSum = fractionSum;
      renderProgress();
      lastPendingCount = count;
      pendingDone = count === 0;
      if (pendingDone) finish();
    });
    cleanupFns.push(unsubscribePending);

    const preDelayId = setTimeout(() => {
      const frame = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const media = Array.from(container.querySelectorAll('img, video'));
        const pendingState = getPendingState();
        lastPendingCount = pendingState.count;
        pendingFractionSum = pendingState.fractionSum;
        total = media.length + lastPendingCount;
        renderProgress();

        if (total === 0) {
          mediaDone = true;
          finish();
          return;
        }

        if (media.length === 0) {
          mediaDone = true;
        }

        let mediaLoadedCount = 0;
        const markLoaded = () => {
          mediaLoadedCount += 1;
          bumpProgress();
          if (mediaLoadedCount >= media.length) {
            mediaDone = true;
            finish();
          }
        };

        media.forEach((el) => {
          const isVideo = el.tagName === 'VIDEO';
          // For video, wait for canplaythrough (enough buffered to play
          // without stalling) rather than loadeddata (just the first frame),
          // otherwise the overlay lifts before playback can actually run smoothly.
          const isReady = isVideo ? el.readyState >= 4 : el.complete;

          if (isReady) {
            markLoaded();
            return;
          }

          const eventName = isVideo ? 'canplaythrough' : 'load';
          el.addEventListener(eventName, markLoaded, { once: true });
          el.addEventListener('error', markLoaded, { once: true });

          cleanupFns.push(() => {
            el.removeEventListener(eventName, markLoaded);
            el.removeEventListener('error', markLoaded);
          });
        });

        if (pendingDone) finish();
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

  // Nav links point at home page sections (/#about). Scroll once the page is
  // revealed, so covers above the section have loaded and the position is final.
  // location.key re-runs this when the same link is clicked twice.
  useEffect(() => {
    if (loading) return;
    // A refresh starts at the top even if the address still ends in a section
    // left over from clicking a nav link; drop that ending so it doesn't linger
    if (isReload.current) {
      isReload.current = false;
      if (location.hash) {
        navigate(location.pathname, { replace: true });
        return;
      }
    }
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [loading, location.hash, location.key, location.pathname, navigate]);

  return (
    <>
      {loading && (
        <div className="page-loader-overlay">
          <div className="page-loader-bar-track">
            <div className="page-loader-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="page-content"
        style={{
          visibility: loading ? 'hidden' : 'visible',
          opacity: loading ? 0 : 1,
        }}
      >
        {/* Pages read `revealed` (useOutletContext) to hold animations until the loader lifts */}
        <Outlet context={{ revealed: !loading }} />
      </div>
    </>
  );
}

export default PageLoader;
