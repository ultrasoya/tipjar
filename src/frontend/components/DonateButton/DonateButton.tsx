import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './styles.module.css';

interface DonateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

function DonateButton({ onClick, disabled = false }: DonateButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className={styles.heartContainer}
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
          <Heart fill="currentColor" />
      </motion.div>
      
      <motion.div
        className={styles.pulseRing}
        animate={{ 
          scale: [1, 1.5],
          opacity: [0.7, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      
      <span className={styles.label}>
        Donate
      </span>
    </motion.button>
  );
}

export default DonateButton;