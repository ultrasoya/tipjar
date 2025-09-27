import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";

export type GiftBoxProps = {
  isOpen: boolean;
  coins: number[];
};

const GiftBox = ({ isOpen, coins }: GiftBoxProps) => {
  const coinOffsets = useMemo(() => {
    const map = new Map<number, number>();
    coins.forEach((id) => map.set(id, Math.random() * 120 - 60));
    return map;
  }, [coins]);

  return (
    <div className={styles.container}>
        <motion.div
          className={styles.stage}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
             className={styles.shadow}
             animate={{
               scale: [1, 0.5, 1],
             }}
             transition={{ duration: 2, repeat: Infinity }}
          />
        <div className={styles.body} />
        <div className={styles.verticalRibbon} />
        <div className={styles.horizontalRibbon} />

        <motion.div
          className={styles.lid}
          animate={isOpen ? { translateY: -48 } : { translateY: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className={styles.bowContainer}>
            <div className={styles.bowDot} />
            <div className={styles.bowDot} />
          </div>
        </motion.div>

        <AnimatePresence>
          {coins.map((id) => (
            <motion.div
                key={id}
                className={styles.coinBase}
                style={{ transform: `translateX(${coinOffsets.get(id) ?? 0}px)` }}
                initial={{ y: -48, opacity: 0, rotate: 0, scale: 0.8 }}
                animate={{ y: 144, opacity: 1, rotate: 360, scale: 1 }} // 144 = 192 (высота коробки) - 48 (высота крышки)
                exit={{ opacity: 0 }}
                                 transition={{ 
                     duration: 1.1, 
                     ease: "easeOut",
                     exit: { duration: 0.4 }
                 }}
            >
              <div className={styles.coinInset} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default React.memo(GiftBox);