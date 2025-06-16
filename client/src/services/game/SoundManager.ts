export class SoundManager {
  private static instance: SoundManager;
  private audioElements: Map<string, HTMLAudioElement>;

  private constructor() {
    this.audioElements = new Map();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public preloadSounds(sounds: Record<string, { path: string; volume: number }>) {
    console.log('Preloading sounds:', Object.keys(sounds));
    Object.entries(sounds).forEach(([key, { path, volume }]) => {
      console.log(`Creating audio element for ${key} with path:`, path);
      const audio = new Audio(path);
      audio.volume = volume;
      audio.addEventListener('canplaythrough', () => {
        console.log(`Sound ${key} loaded successfully`);
      });
      audio.addEventListener('error', (e) => {
        console.error(`Error loading sound ${key}:`, e);
      });
      this.audioElements.set(key, audio);
    });
  }

  public play(key: string) {
    console.log(`Attempting to play sound: ${key}`);
    const audio = this.audioElements.get(key);
    if (audio) {
      console.log(`Found audio element for ${key}, playing...`);
      // Stop and reset the audio before playing
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error(`Error playing sound ${key}:`, error);
      });
    } else {
      console.warn(`No audio element found for key: ${key}`);
    }
  }
} 