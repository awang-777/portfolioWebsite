// Each pending item maps to its fractional progress (0–1), so long async
// loads (e.g. a large GLB) can move the bar while they download instead of
// jumping from 0 to 100 on resolve.
const items = new Map();
const listeners = new Set();
let nextId = 0;

function notify() {
  const state = getPendingState();
  listeners.forEach((fn) => fn(state));
}

export function registerPending() {
  const id = nextId;
  nextId += 1;
  items.set(id, 0);
  notify();

  let done = false;
  return {
    setProgress(fraction) {
      if (done) return;
      items.set(id, Math.min(1, Math.max(0, fraction)));
      notify();
    },
    resolve() {
      if (done) return;
      done = true;
      items.delete(id);
      notify();
    },
  };
}

export function getPendingState() {
  let fractionSum = 0;
  items.forEach((fraction) => {
    fractionSum += fraction;
  });
  return { count: items.size, fractionSum };
}

export function subscribePending(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
