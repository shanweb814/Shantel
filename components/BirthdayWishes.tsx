
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveElement } from './InteractiveElement';

interface BirthdayWishesProps {
  onNext: () => void;
  onBack: () => void;
}

const WISHES = [
  { title: "Success", body: "May this year bring unprecedented growth and professional milestones.", icon: "📈" },
  { title: "Joy", body: "Endless moments of laughter with the ones you love most.", icon: "✨" },
  { title: "Health", body: "A year of strength, vitality, and mindful peace.", icon: "🌿" },
  { title: "Adventure", body: "New horizons to explore and beautiful memories to create.", icon: "🌎" },
];

export const BirthdayWishes: React.FC<BirthdayWishesProps> = ({ onNext, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <motion.h2 
          className="serif text-4xl md:text-5xl font-bold text-slate-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Wishes for You
        </motion.h2>
        <div className="h-1 w-20 bg-rose-400 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {WISHES.map((wish, i) => (
          <InteractiveElement key={wish.title}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="glass p-8 rounded-2xl h-full flex flex-col items-center text-center group hover:border-rose-300 transition-colors"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-125 transition-transform duration-500">{wish.icon}</div>
              <h3 className="font-bold text-slate-800 text-lg mb-3 tracking-wide uppercase">{wish.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed text-sm">
                {wish.body}
              </p>
            </motion.div>
          </InteractiveElement>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button
          onClick={onBack}
          className="px-8 py-3 text-slate-400 font-medium hover:text-slate-600 transition-colors active:scale-95"
        >
          Go Back
        </button>
        <InteractiveElement>
          <button
            onClick={onNext}
            className="px-10 py-4 bg-rose-500 text-white rounded-full font-bold shadow-xl hover:shadow-rose-200 transition-all active:scale-95"
          >
            Continue Celebration
          </button>
        </InteractiveElement>
      </div>
    </div>
  );
};
