// components/PopupMessage.tsx
import { useUIStore } from '@/stores/UIStore';
import { useEffect } from 'react';

export const PopupMessage = () => {
  const { popupMessage, popupType, hidePopup } = useUIStore();

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(hidePopup, 1200);
      return () => clearTimeout(timer);
    }
  }, [popupMessage, hidePopup]);

  if (!popupMessage) return null;

  return (
    <div className={`popup-message ${popupType}`}>
      {popupMessage}
      <style>{`
        .popup-message {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2.5rem;
          font-weight: bold;
          color: white;
          background: rgba(0,0,0,0.8);
          padding: 1rem 2rem;
          border-radius: 1rem;
          opacity: 1;
          animation: popup-fade 1.2s ease;
          pointer-events: none;
          z-index: 100;
          text-shadow: 0 0 10px rgba(255,255,255,0.5);
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
          border: 2px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(5px);
        }
        .popup-message.combo { 
          color: #ffeb3b;
          text-shadow: 0 0 15px rgba(255,235,59,0.7);
          border-color: rgba(255,235,59,0.3);
          animation: popup-fade-combo 1.2s ease;
        }
        .popup-message.tetris { 
          color: #00e676;
          text-shadow: 0 0 15px rgba(0,230,118,0.7);
          border-color: rgba(0,230,118,0.3);
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

