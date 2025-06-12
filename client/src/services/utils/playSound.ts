// Cache for audio elements to prevent creating new instances
const audioCache: { [key: string]: HTMLAudioElement } = {};

export const playSound = (sound: string) => {
  try {
    // Get or create audio element
    if (!audioCache[sound]) {
      audioCache[sound] = new Audio(sound);
    }

    // Clone the audio element to allow overlapping sounds
    const audio = audioCache[sound].cloneNode() as HTMLAudioElement;
    
    // Reset the audio to start
    audio.currentTime = 0;
    
    // Play the sound
    const playPromise = audio.play();
    
    // Handle any play errors
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }

    // Clean up the cloned audio element after it finishes playing
    audio.onended = () => {
      audio.remove();
    };
  } catch (error) {
    console.warn('Error playing sound:', error);
  }
};
