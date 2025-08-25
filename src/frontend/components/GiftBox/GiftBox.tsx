import type { CSSProperties } from "react";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type GiftBoxProps = {
  isOpen: boolean;
  coins: number[];
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
};

const stageStyle: CSSProperties = {
  position: "relative",
  width: 192, // 48 * 4
  height: 192,
};

const bodyStyle: CSSProperties = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "75%",
  background: "#f43f5e",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  zIndex: 10,
};

const verticalRibbonStyle: CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 24,
  height: "75%",
  background: "#be123c",
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  zIndex: 11,
};

const horizontalRibbonStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  bottom: "50%",
  width: "100%",
  height: 24,
  background: "#be123c",
  zIndex: 11,
};

const lidStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "25%",
  background: "#e11d48",
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  transformOrigin: "top center",
};

const bowDot: CSSProperties = {
  width: 12,
  height: 12,
  background: "#fcd34d",
  borderRadius: "50%",
};

const coinBase: CSSProperties = {
  position: "absolute",
  top: -48, // Начинаем сверху поднятой крышки
  left: "50%",
  width: 24,
  height: 24,
  background: "#fcd34d",
  borderRadius: "50%",
  border: "1px solid #d97706",
  zIndex: 5,
};

const coinInset: CSSProperties = {
  position: "absolute",
  inset: 4,
  borderRadius: "50%",
  background: "#fde68a",
};

const GiftBox = ({ isOpen, coins }: GiftBoxProps) => {
  const coinOffsets = useMemo(() => {
    const map = new Map<number, number>();
    coins.forEach((id) => map.set(id, Math.random() * 120 - 60));
    return map;
  }, [coins]);

  return (
    <div style={containerStyle}>
      <motion.div
        style={stageStyle}
        animate={{
          y: [0, -8, 0],
          boxShadow: [
            "0px 6px 14px rgba(0,0,0,0.18)",
            "0px 22px 34px rgba(0,0,0,0.32)",
            "0px 6px 14px rgba(0,0,0,0.18)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div style={bodyStyle} />
        <div style={verticalRibbonStyle} />
        <div style={horizontalRibbonStyle} />

        <motion.div
          style={lidStyle}
          animate={isOpen ? { translateY: -48 } : { translateY: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              gap: 4,
            }}
          >
            <div style={bowDot} />
            <div style={bowDot} />
          </div>
        </motion.div>

        <AnimatePresence>
          {coins.map((id) => (
            <motion.div
                key={id}
                style={{ ...coinBase, transform: `translateX(${coinOffsets.get(id) ?? 0}px)` }}
                initial={{ y: -48, opacity: 0, rotate: 0, scale: 0.8 }}
                animate={{ y: 144, opacity: 1, rotate: 360, scale: 1 }} // 144 = 192 (высота коробки) - 48 (высота крышки)
                exit={{ opacity: 0 }}
                                 transition={{ 
                     duration: 1.1, 
                     ease: "easeOut",
                     exit: { duration: 0.4 }
                 }}
            >
              <div style={coinInset} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GiftBox;