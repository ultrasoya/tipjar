import { DonationListModalContent } from "./DonationListModalContent";
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
  if (!isOpen) return null;

  return (
    <DonationListModalContent
      onClose={onClose}
      donations={donations}
      totalDonations={totalDonations}
      onLoadMore={onLoadMore}
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
    />
  );
}