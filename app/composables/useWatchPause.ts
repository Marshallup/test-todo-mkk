export function useWatchPause() {
  let _paused = false;

  const isPaused = () => _paused;

  function pauseWatch() {
    _paused = true;
  }

  function resumeWatch() {
    nextTick(() => {
      _paused = false;
    });
  }

  return { isPaused, pauseWatch, resumeWatch };
}
