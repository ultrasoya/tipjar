import React, { Suspense, type ReactNode } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import styles from './ModalWrapper.module.css';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  loadingText?: string;
  className?: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
  loadingText = "Loading...",
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${className}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Suspense fallback={
          <div className={styles.loadingContainer}>
            <LoadingSpinner size="large" text={loadingText} />
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default ModalWrapper;
