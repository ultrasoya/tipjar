import { motion } from "framer-motion";

type DonateButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

const baseStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: 8,
  color: "#fff",
  fontWeight: 600,
  boxShadow: "0 6px 14px rgba(0,0,0,0.18)",
  border: "none",
};

const DonateButton = ({ onClick, disabled }: DonateButtonProps) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      onClick={disabled ? undefined : onClick}
      style={{
        ...baseStyle,
        background: disabled ? "#9ca3af" : "#059669",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {disabled ? "Processing..." : "Donate"}
    </motion.button>
  );
};

export default DonateButton;