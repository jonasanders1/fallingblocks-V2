import combo2Sound from "@/assets/sounds/combo-2.mp3";
import combo3Sound from "@/assets/sounds/combo-3.mp3";
import combo4Sound from "@/assets/sounds/combo-4.mp3";
import combo5Sound from "@/assets/sounds/combo-5.mp3";
import dropSound from "@/assets/sounds/drop.mp3";
import tetrisSound from "@/assets/sounds/tetris.mp3";
// Import other sound assets here

interface SoundConfig {
  path: string;
  volume: number;
}

export const SOUND_KEYS = {
  COMBO_2: 'COMBO_2',
  COMBO_3: 'COMBO_3',
  COMBO_4: 'COMBO_4',
  COMBO_5: 'COMBO_5',
  DROP: 'DROP',
  TETRIS: 'TETRIS',
  // Add other sound keys here
} as const;

export const SOUND_ASSETS = {
  [SOUND_KEYS.COMBO_2]: {
    path: combo2Sound,
    volume: 0.2, // Lower volume for combo sound
  },
  [SOUND_KEYS.COMBO_3]: {
    path: combo3Sound,
    volume: 0.2,
  },
  [SOUND_KEYS.COMBO_4]: {
    path: combo4Sound,
    volume: 0.2,
  },
  [SOUND_KEYS.COMBO_5]: {
    path: combo5Sound,
    volume: 0.2,
  },
  [SOUND_KEYS.DROP]: {
    path: dropSound,
    volume: 0.4, // Slightly higher volume for drop sound since it's more subtle
  },
  [SOUND_KEYS.TETRIS]: {
    path: tetrisSound,
    volume: 0.1, // Medium volume for Tetris sound
  },
  // Add other sound mappings here
} satisfies Record<keyof typeof SOUND_KEYS, SoundConfig>; 