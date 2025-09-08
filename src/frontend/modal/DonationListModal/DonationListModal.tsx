import { motion } from "framer-motion";
import { X, Gift, Users, Gem, Loader2 } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import styles from "./DonationListModal.module.css";
import type { Donation } from "@shared/types/contracts";

interface DonationListModalProps {
  isOpen: boolean;
  onClose: () => void;
  donations: Donation[];
  totalDonations: string;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export function DonationListModal({
  isOpen,
  onClose,
  donations,
  totalDonations,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: DonationListModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !hasMore || isLoadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

    if (isNearBottom) {
      onLoadMore();
    }
  }, [hasMore, isLoadingMore, onLoadMore]);

  useEffect(() => {
    // Не настраиваем скролл, если модалка не открыта
    if (!isOpen) return;
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isOpen]);

  if (!isOpen) return null;

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount);
    return `${numAmount.toFixed(4)} ETH`;
  };

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContainer}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Gift />
            </div>
            <div className={styles.headerText}>
              <h2>
                All Donations
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            <X />
          </button>
        </div>

        {/* Total Summary */}
        <div className={styles.totalSummary}>
          <div className={styles.totalHeader}>
            <Users />
            <span>
              Total Donations
            </span>
          </div>
          <div className={styles.totalAmounts}>
            {formatCurrency(totalDonations)}
          </div>
        </div>

        {/* Donations List */}
        <div className={styles.donationsList} ref={scrollContainerRef}>
          {donations?.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Gift />
              </div>
              <h3 className={styles.emptyTitle}>
                No donations yet
              </h3>
              <p className={styles.emptyDescription}>
                Start by making your first donation!
              </p>
            </div>
          ) : (
            <div className={styles.donationsContainer}>
              {donations?.map((donation) => (
                <motion.div
                  key={donation.id}
                  className={styles.donationItem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.donationContent}>
                    <div className={styles.donationLeft}>
                      <div className={styles.donationHeader}>
                        <div className={styles.donorAvatar}>
                            <Gem />
                        </div>
                        <div className={styles.donorInfo}>
                          <h4>
                            {donation.name}
                          </h4>
                          <p>
                            by {donation.donor}
                          </p>
                        </div>
                      </div>
                      {donation.message && (
                        <p className={styles.donationMessage}>
                          "{donation.message}"
                        </p>
                      )}
                      
                    </div>
                    <div className={styles.donationAmount}>
                      <div className={styles.donationAmountValue}>
                        {formatCurrency(
                          donation.amount,
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading indicator */}
              {isLoadingMore && (
                <div className={styles.loadingIndicator}>
                  <Loader2 className={styles.loadingSpinner} />
                  <span>Loading more donations...</span>
                </div>
              )}
              
              {/* End of list indicator */}
              {!hasMore && donations.length > 0 && (
                <div className={styles.endOfList}>
                  <span>You've reached the end of the list</span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}