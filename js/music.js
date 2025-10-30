// Universal background music handler
(function() {
  if (window._musicSetup) return; // Prevent multiple inits per page
  window._musicSetup = true;

  const MUSIC_SRC = 'sounds/background.mp3';
  let audio = window._sharedMusic;
  let resumeTime = +localStorage.getItem('bgmusicTime') || 0;
  let resumePaused = localStorage.getItem('bgmusicPaused') === 'true';

  if (!audio) {
    audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.22;
    window._sharedMusic = audio;
  }

  // Resume from last saved time
  if (resumeTime && !isNaN(resumeTime)) audio.currentTime = resumeTime;
  if (!resumePaused) {
    audio.play().catch(() => {});
  }

  // Save time & paused state on navigation or periodically
  setInterval(() => {
    try {
      localStorage.setItem('bgmusicTime', Math.floor(audio.currentTime));
      localStorage.setItem('bgmusicPaused', audio.paused ? 'true' : '');
    } catch (e) {}
  }, 7000);

  window.addEventListener('beforeunload', () => {
    try {
      localStorage.setItem('bgmusicTime', Math.floor(audio.currentTime));
      localStorage.setItem('bgmusicPaused', audio.paused ? 'true' : '');
    } catch (e) {}
    audio.pause();
  });

  // Only auto-play on user interaction
  function tryPlay() { audio.play().catch(()=>{}); }
  document.addEventListener('click', tryPlay, { once: true });
  document.addEventListener('keydown', tryPlay, { once: true });

  // Stash the shared instance on window
  window._sharedMusic = audio;
})();

