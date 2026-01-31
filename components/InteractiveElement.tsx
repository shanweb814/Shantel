
import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveElementProps {
  children: React.ReactNode;
  className?: string;
}

export const InteractiveElement: React.FC<InteractiveElementProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};
