
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BirthdayHome } from './components/BirthdayHome';
import { BirthdayWishes } from './components/BirthdayWishes';
import { BirthdayClosing } from './components/BirthdayClosing';
import { BackgroundDecor } from './components/BackgroundDecor';

type PageState = 'intro' | 'wishes' | 'outro';

const App: React.FC = () => {
  const [page, setPage] = useState<PageState>('intro');

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  useEffect(() => {
    triggerConfetti();
  }, []);

  const navigate = (to: PageState) => {
    setPage(to);
    if (to === 'outro' || to === 'intro') triggerConfetti();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center selection:bg-rose-200">
      <BackgroundDecor />
      
      <AnimatePresence mode="wait">
        {page === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "anticipate" }}
            className="z-10 w-full px-4"
          >
            <BirthdayHome onNext={() => navigate('wishes')} />
          </motion.div>
        )}

        {page === 'wishes' && (
          <motion.div
            key="wishes"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10 w-full px-4"
          >
            <BirthdayWishes onNext={() => navigate('outro')} onBack={() => navigate('intro')} />
          </motion.div>
        )}

        {page === 'outro' && (
          <motion.div
            key="outro"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10 w-full px-4"
          >
            <BirthdayClosing onBack={() => navigate('wishes')} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 text-slate-400 text-[10px] font-semibold uppercase tracking-[0.3em] pointer-events-none">
        Exclusively Crafted for Shantel McNeal
      </div>
    </div>
  );
};

export default App;
