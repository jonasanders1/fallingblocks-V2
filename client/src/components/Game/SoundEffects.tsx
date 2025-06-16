import { useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import { useBoardStore } from '@/stores/boardStore';
import { SOUND_KEYS } from '@/constants/sounds';

export const SoundEffects = () => {
  const { playSound } = useSound();

  useEffect(() => {
    const unsubscribeBoard = useBoardStore.subscribe(() => {
      // Play drop sound when a piece is locked
      playSound(SOUND_KEYS.DROP);
    });

    return () => {
      unsubscribeBoard();
    };
  }, [playSound]);

  return null;
}; 