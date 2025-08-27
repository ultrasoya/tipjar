import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins } from 'lucide-react';
import { Button } from './ui/button';
import Input from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';
import { useState } from 'react';
import styles from './DonationModal.module.css';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: string, currency: string) => void;
}

export function DonationModal({ isOpen, onClose, onDonate }: DonationModalProps) {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ETH');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsProcessing(true);
    
    // Simulate donation processing
    setTimeout(() => {
      onDonate(amount, currency);
      setIsProcessing(false);
      setAmount('');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className={styles.closeButton}
              >
                <X className={styles.closeIcon} />
              </button>

              {/* Header */}
              <div className={styles.header}>
                <motion.div
                  className={styles.iconContainer}
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Coins className={styles.icon} />
                </motion.div>
                <h2 className={styles.title}>Make a Donation</h2>
                <p className={styles.subtitle}>Support our cause with cryptocurrency</p>
              </div>

              {/* Form */}
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Currency
                  </label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETH">ETH - Ethereum</SelectItem>
                      <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                      <SelectItem value="USDC">USDC - USD Coin</SelectItem>
                      <SelectItem value="MATIC">MATIC - Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Donation Info */}
                {amount && (
                  <motion.div
                    className={styles.donationInfo}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className={styles.donationText}>
                      You're donating <span className={styles.donationAmount}>{amount} {currency}</span>
                    </p>
                  </motion.div>
                )}

                {/* Donate Button */}
                <Button
                  onClick={handleDonate}
                  disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
                  className={styles.donateButton}
                >
                  {isProcessing ? (
                    <motion.div
                      className={styles.processingContainer}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className={styles.spinner} />
                      Processing...
                    </motion.div>
                  ) : (
                    'Donate Now'
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}