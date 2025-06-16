// components/PopupMessage.tsx
import { useUIStore } from '@/stores/uiStore';
import { useEffect } from 'react';
import themes from '@/styles/colorScheme';

export const PopupMessage = () => {
  const { popupMessage, popupType, hidePopup } = useUIStore();

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(hidePopup, 1200);
      return () => clearTimeout(timer);
    }
  }, [popupMessage, hidePopup]);

  if (!popupMessage) return null;

  // Extract combo number from message (e.g., "Combo x2!" -> 2)
  const getComboLevel = (message: string) => {
    const match = message.match(/x(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Get color based on combo level or type
  const getPopupColor = (type: string | null, message: string) => {
    if (type === 'tetris') return themes.dark.blocks.S; // S piece color for Tetris
    
    const comboLevel = getComboLevel(message);
    switch (comboLevel) {
      case 2: return themes.dark.blocks.O; // O piece color
      case 3: return themes.dark.blocks.T; // T piece color
      case 4: return themes.dark.blocks.Z; // Z piece color
      case 5: return themes.dark.blocks.J; // J piece color
      default: return themes.dark.blocks.I; // I piece color for default
    }
  };

  const popupColor = getPopupColor(popupType, popupMessage);

  return (
    <div 
      className={`popup-message ${popupType}`}
      style={{ 
        '--popup-color': popupColor,
        '--popup-glow': `${popupColor}80`, // 50% opacity for glow
        '--popup-border': `${popupColor}40`, // 25% opacity for border
      } as React.CSSProperties}
    >
      {popupMessage}
      <style>{`
        .popup-message {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--popup-color);
          background: ${themes.dark.overlay.blur};
          padding: 1rem 2rem;
          border-radius: 1rem;
          opacity: 1;
          animation: popup-fade 1.2s ease;
          pointer-events: none;
          z-index: 100;
          text-shadow: 0 0 10px var(--popup-glow);
          box-shadow: 
            0 0 20px ${themes.dark.shadows.medium},
            0 0 40px var(--popup-glow);
          border: 2px solid var(--popup-border);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        @media (prefers-color-scheme: light) {
          .popup-message {
            background: ${themes.light.overlay.blur};
            box-shadow: 
              0 0 20px ${themes.light.shadows.medium},
              0 0 40px var(--popup-glow);
            text-shadow: 
              0 0 10px var(--popup-glow),
              0 0 2px ${themes.light.shadows.medium};
          }
        }

        .popup-message.combo { 
          animation: popup-fade-combo 1.2s ease;
        }
        .popup-message.tetris { 
          animation: popup-fade-tetris 1.2s ease;
        }
        @keyframes popup-fade-combo {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -60%) scale(0.8) rotate(-5deg);
            filter: brightness(1.5);
          }
          10% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.1) rotate(0deg);
            filter: brightness(1.2);
          }
          20% { transform: translate(-50%, -50%) scale(1.05) rotate(2deg); }
          30% { transform: translate(-50%, -50%) scale(1.1) rotate(-2deg); }
          40% { transform: translate(-50%, -50%) scale(1.05) rotate(0deg); }
          80% { 
            opacity: 1;
            filter: brightness(1);
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -40%) scale(0.8) rotate(5deg);
            filter: brightness(0.8);
          }
        }
        @keyframes popup-fade-tetris {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -60%) scale(0.8);
            filter: brightness(1.5) blur(5px);
          }
          10% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.2);
            filter: brightness(1.2) blur(0px);
          }
          20% { transform: translate(-50%, -50%) scale(1.1); }
          30% { transform: translate(-50%, -50%) scale(1.15); }
          40% { transform: translate(-50%, -50%) scale(1.1); }
          80% { 
            opacity: 1;
            filter: brightness(1);
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -40%) scale(0.8);
            filter: brightness(0.8) blur(5px);
          }
        }
      `}</style>
    </div>
  );
};

