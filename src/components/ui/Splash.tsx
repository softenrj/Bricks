"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/hooks/redux';

const HOLI_COLORS = ['#FF007F', '#00FF00', '#00BFFF', '#FFD700', '#9400D3', '#FF4500'];

const SplatterSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
    <path
      d="M260.6 42.1c-15.5-18.4-44.4-11.2-50.6 11.8-4.2 15.6-22.6 23.3-37.4 15.6-20.9-10.8-44.5 9-38.3 31.4 4.2 15.2-7.5 30.6-23.3 30.6-23.7 0-35.3 28.5-18.7 45.4 11.2 11.5 5.5 31.1-10.5 36.6-22.3 7.8-24.8 39.4-4 46.2 14.1 4.6 18.3 23.9 8.2 35.5-14.1 16.3 0.6 42.4 22.8 40.5 14.8-1.3 27.6 11.9 24.5 26.5-4.3 20.3 19.8 34.5 36.6 21.6 11.3-8.6 28.2-1.3 31.8 12.8 5 19.6 32.5 24 44.5 7.1 8-11.2 26-9.6 33.6 3 10.6 17.5 37.1 12.7 44.3-8 4.8-13.8 23.9-13.7 30.8 0.2 10.3 21 27.2 2.3 27.2-16.1 0-14.1-12.8-26.6-21.3-39.7-12-18.3 5.4-36.9 26.8-28.7 15.6 6 22-13.2 11.9-29.3-14-22.5 1.5-49.8 24.3-43.2 15.4 4.5 29.5-6.9 26-22.3-4.9-21.7 17.9-38 36.2-25.9 12.3 8.1 29.2-1 30.9-15.9 2.4-20.9-20.5-35.1-36.6-22.6-10.9 8.5-27.4 0-30.6-15.4-4.5-21.8-33.1-26.9-45.2-8.1-8.1 12.6-27.4 5.3-32.5-12.3-7.2-24.8-37.5-11.5-48.5 8.5C282.6 110.8 281.3 66.8 260.6 42.1Z"
      fill={color}
    />
    <circle cx="120" cy="90" r="15" fill={color} />
    <circle cx="400" cy="180" r="25" fill={color} />
    <circle cx="380" cy="380" r="12" fill={color} />
    <circle cx="90" cy="350" r="20" fill={color} />
  </svg>
);

type Splat = {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
};

export default function CustomSplash() {
  const [splats, setSplats] = useState<Splat[]>([]);
  const features = useAppSelector(state => state.Effects)

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button')) return;

      const newSplat: Splat = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        color: HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)],
        rotation: Math.floor(Math.random() * 360),
        scale: Math.random() * 0.5 + 0.8,
      };

      setSplats((prev) => [...prev, newSplat]);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  React.useEffect(() => {
    if (!features) {
        handleWashScreen()
    }
  },[features])

  const handleWashScreen = () => {
    setSplats([]);
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
        <AnimatePresence>
          {splats.map((splat) => (
            <motion.div
              key={splat.id}
              className="absolute w-48 h-48 -ml-24 -mt-24"
              style={{
                left: splat.x,
                top: splat.y,
              }}
              initial={{ scale: 0, opacity: 0, rotate: splat.rotation - 45 }}
              animate={{ 
                scale: splat.scale, 
                opacity: 0.9, 
                rotate: splat.rotation 
              }}
              exit={{ 
                opacity: 0, 
                y: splat.y + 200,
                filter: "blur(10px)",
                transition: { duration: 0.5 } 
              }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 15,
                mass: 0.5,
              }}
            >
              <SplatterSVG color={splat.color} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}