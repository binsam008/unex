import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC]">
      {/* Subtle glowing backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>
      
      <div className="relative w-72 md:w-96 h-36 flex flex-col items-center justify-center z-10 transition-all">
        
        {/* Background / Empty Logo (Grayscale, low opacity) */}
        <img 
          src="/logo.png" 
          alt="Loading base" 
          className="absolute inset-0 w-full h-full object-contain grayscale opacity-20"
        />

        {/* Foreground / Filled Logo with animated clip path simulating a color fill */}
        <motion.img 
          src="/logo.png" 
          alt="Loading color" 
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{
            duration: 1.5,
            ease: "circOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.5
          }}
        />
      </div>

      {/* Loading Details Dots */}
      <motion.div 
        className="mt-6 flex gap-1.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-sm font-semibold text-slate-500 uppercase tracking-widest z-10"
      >
        Loading
      </motion.p>
    </div>
  );
}
