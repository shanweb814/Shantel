
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveElement } from './InteractiveElement';

interface BirthdayHomeProps {
  onNext: () => void;
}

export const BirthdayHome: React.FC<BirthdayHomeProps> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-6 inline-block uppercase tracking-[0.4em] text-rose-400 font-bold text-sm"
      >
        The Golden 31st Celebration
      </motion.div>

      <InteractiveElement className="mb-8 block">
        <motion.h1 
          className="serif text-6xl md:text-9xl font-bold text-slate-800 leading-[0.9] mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Shantel<br />
          <span className="text-rose-500 italic">McNeal</span>
        </motion.h1>
      </InteractiveElement>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <span className="cursive text-4xl md:text-5xl text-amber-600">January 31st • Turning 31</span>
        <p className="text-slate-500 mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Turning 31 on the 31st? That's not just a birthday, it's a <strong>Calendar Jackpot!</strong> 🎰 
          You've officially synchronized with time itself. Talk about perfect timing!
        </p>
      </motion.div>

      <div className="flex flex-col items-center justify-center gap-6">
        <InteractiveElement>
          <button
            onClick={onNext}
            className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-4"
          >
            Explore the Year Ahead
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </InteractiveElement>
      </div>

      <motion.div 
        className="mt-20 flex justify-center gap-12 opacity-30 grayscale items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-2xl font-bold">31</span>
        <span className="text-2xl">✦</span>
        <span className="text-2xl uppercase tracking-tighter">January</span>
        <span className="text-2xl">✦</span>
        <span className="text-2xl font-bold">31</span>
      </motion.div>
    </div>
  );
};
