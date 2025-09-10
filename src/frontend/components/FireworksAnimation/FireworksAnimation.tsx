import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './FireworksAnimation.module.css';

interface FireworksAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  delay: number;
  color: string;
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  color: string;
}

export function FireworksAnimation({ isActive, onComplete }: FireworksAnimationProps) {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    if (isActive) {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
      
      // Generate 4 fireworks at random positions
      const newFireworks: Firework[] = Array.from({ length: 4 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60, // Random X position (20% to 80%)
        y: 20 + Math.random() * 40, // Random Y position (20% to 60%)
        delay: i * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      
      setFireworks(newFireworks);

      // Complete animation
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className={styles.container}>
      {fireworks.map((firework) => (
        <FireworkBurst
          key={firework.id}
          x={firework.x}
          y={firework.y}
          delay={firework.delay}
          color={firework.color}
        />
      ))}
    </div>
  );
}

function FireworkBurst({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
    distance: 60 + Math.random() * 40,
    color: color,
  }));

  return (
    <div 
      className={styles.fireworkContainer}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Central explosion */}
      <motion.div
        className={styles.centralExplosion}
        style={{ backgroundColor: color }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 2, 0],
          opacity: [0, 1, 0],
        }}
        transition={{ 
          duration: 0.6,
          delay: delay,
          ease: "easeOut"
        }}
      />

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.particle}
          style={{ backgroundColor: particle.color }}
          initial={{ 
            scale: 0,
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: Math.cos(particle.angle * Math.PI / 180) * particle.distance,
            y: Math.sin(particle.angle * Math.PI / 180) * particle.distance,
          }}
          transition={{ 
            duration: 1.2,
            delay: delay + 0.1,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Sparkles */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className={styles.sparkle}
          initial={{ 
            scale: 0,
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            x: Math.cos((i * 60) * Math.PI / 180) * (30 + Math.random() * 20),
            y: Math.sin((i * 60) * Math.PI / 180) * (30 + Math.random() * 20),
          }}
          transition={{ 
            duration: 1,
            delay: delay + 0.3 + i * 0.1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}