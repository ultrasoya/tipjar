import { motion } from "framer-motion";
import { List } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./DonationListButton.module.css";

interface DonationListButtonProps {
  onClick: () => void;
}

function DonationListButton({ onClick }: DonationListButtonProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const motionProps = isMobile ? {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 1, x: 0 }
  } : {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.7 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  if (isMobile) {
    return (
      <button
        onClick={onClick}
        className={styles.donationListButton}
      >
        <List className={styles.icon} />
        <span className={styles.text}>
          View Donations
        </span>
      </button>
    );
  }

  return (
      <motion.button
        onClick={onClick}
        className={styles.donationListButton}
        {...motionProps}
      >
        <List className={styles.icon} />
        <span className={styles.text}>
          View Donations
        </span>
      </motion.button>
  );
};

export default DonationListButton;