import { motion } from "framer-motion";
import { List } from "lucide-react";
import type { Donation } from "@shared/types/contracts";
import styles from "./DonationListButton.module.css";

interface DonationListButtonProps {
  onClick: () => void;
  donations: Donation[];
}

function DonationListButton({ onClick, donations }: DonationListButtonProps) {

  return (
      <motion.button
        onClick={onClick}
        className={styles.donationListButton}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <List className={styles.icon} />
        <span className={styles.text}>
          View Donations
        </span>
        {donations.length > 0 && (
          <div className={styles.badge}>
            {donations.length}
          </div>
        )}
      </motion.button>
  );
};

export default DonationListButton;