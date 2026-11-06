import { useEffect, useState } from 'react';
import './Typewriter.css';

const CHAR_MS = 28;
const START_DELAY_MS = 300;
const CURSOR_LINGER_MS = 1800; // cursor keeps blinking this long after the last letter

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Types `text` out one letter at a time once `start` is true. The untyped part is
// rendered but transparent, so lines wrap where they will end up and nothing below
// shifts while typing
function Typewriter({ text, start = true, className }) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));
  const [showCursor, setShowCursor] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!start || count >= text.length) return undefined;
    const id = setTimeout(() => setCount((c) => c + 1), count === 0 ? START_DELAY_MS : CHAR_MS);
    return () => clearTimeout(id);
  }, [start, count, text.length]);

  useEffect(() => {
    if (count < text.length || !showCursor) return undefined;
    const id = setTimeout(() => setShowCursor(false), CURSOR_LINGER_MS);
    return () => clearTimeout(id);
  }, [count, text.length, showCursor]);

  return (
    <p className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {showCursor && <span className="typewriter-cursor" />}
        <span className="typewriter-rest">{text.slice(count)}</span>
      </span>
    </p>
  );
}

export default Typewriter;
