import { useEffect } from 'react';
import { SoundManager } from '@/services/game/SoundManager';
import { SOUND_ASSETS } from '@/constants/sounds';

// Create a singleton instance
const soundManager = SoundManager.getInstance();

// Define WebKit audio context type
interface WebKitWindow extends Window {
  webkitAudioContext: typeof AudioContext;
}

export const useSound = () => {
  useEffect(() => {
    console.log('useSound hook: Initializing sounds');
    soundManager.preloadSounds(SOUND_ASSETS);

    // Add a click handler to enable audio on first interaction
    const enableAudio = () => {
      console.log('useSound hook: User interaction detected, enabling audio');
      // Create and play a silent audio context to enable audio
      const AudioContext = window.AudioContext || ((window as unknown) as WebKitWindow).webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop();
      
      // Remove the click handler once audio is enabled
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };
  }, []);

  return {
    playSound: (key: string) => {
      console.log('useSound hook: Playing sound:', key);
      soundManager.play(key);
    },
    // These methods are stubs for future implementation
    setVolume: () => {},
    toggleMute: () => {}
  };
}; 