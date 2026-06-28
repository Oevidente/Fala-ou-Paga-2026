let audioCtx: AudioContext | null = null;
let soundEnabled = localStorage.getItem('falaoupaga_sound') !== 'disabled';

export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  localStorage.setItem('falaoupaga_sound', soundEnabled ? 'enabled' : 'disabled');
  return soundEnabled;
};

export const getSoundEnabled = () => soundEnabled;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playClickSound = () => {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Ignore audio errors
  }

  try {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  } catch (e) {}
};

export const playRevealSound = () => {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.25);

    gainNode.gain.setValueAtTime(0.0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  } catch(e) {}

  try {
    if ('vibrate' in navigator) {
      navigator.vibrate([15, 40, 20]);
    }
  } catch (e) {}
};
