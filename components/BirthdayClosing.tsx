
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveElement } from './InteractiveElement';

interface BirthdayClosingProps {
  onBack: () => void;
}

export const BirthdayClosing: React.FC<BirthdayClosingProps> = ({ onBack }) => {
  return (
    <div className="max-w-3xl mx-auto text-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" className="text-rose-500">
             <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          </svg>
        </div>

        <InteractiveElement className="mb-10 inline-block">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-24 h-24 bg-gradient-to-tr from-rose-100 to-amber-100 rounded-3xl flex items-center justify-center text-5xl mx-auto border border-white/50 shadow-sm"
          >
            ✨
          </motion.div>
        </InteractiveElement>

        <motion.h2 
          className="serif text-5xl md:text-6xl font-bold text-slate-800 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Level 31 Unlocked.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6 text-slate-500 text-lg font-light leading-relaxed max-w-lg mx-auto"
        >
          <p>
            Shantel, they say 31 is a prime age, but celebrating it on the 31st makes it a <span className="text-amber-600 font-semibold italic">Masterpiece Year.</span> 
          </p>
          <p>
            As you step into this perfectly aligned year, may your path be clear, your heart be full, and your calendar always stay this organized.
          </p>
          <p className="font-semibold text-rose-500 italic serif text-2xl">
            Enjoy every second of your special day!
          </p>
        </motion.div>

        <div className="mt-12">
          <InteractiveElement>
            <button
              onClick={onBack}
              className="text-slate-400 uppercase tracking-widest text-xs font-bold border-b border-transparent hover:border-slate-300 transition-all py-2"
            >
              Return to Wishes
            </button>
          </InteractiveElement>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-12 text-slate-400 font-light italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
      >
        "31 on the 31st... You've officially achieved maximum calendar efficiency."
      </motion.div>
    </div>
  );
};
