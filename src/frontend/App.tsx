import './App.css';
import { useCallback, useEffect, useState, lazy, useMemo } from 'react';
import { DonateButton, Header, GiftBox, ModalWrapper } from './components';
import DonationListButton from './components/DonationListButton';
import { eventsEmitter, fetchDonationsAmount, fetchDonationsList } from './utils';
import { DEFAULT_DONATIONS_PAGE_SIZE } from './constants';
import type { Donation } from '@shared/types/contracts';

const DonationModal = lazy(() => import('./modal/DonationModal/DonationModal').then(module => ({ default: module.DonationModal })));
const DonationListModal = lazy(() => import('./modal/DonationListModal/DonationListModal').then(module => ({ default: module.DonationListModal })));

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [coins, setCoins] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [totalDonations, setTotalDonations] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreDonations, setHasMoreDonations] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const memoizedDonations = useMemo(() => donations, [donations]);
  const memoizedTotalDonations = useMemo(() => totalDonations, [totalDonations]);

  const handleOpenDonationModal = useCallback(async () => {
    if (busy) return;
    setBusy(true);

    setIsOpen(true);
  }, [busy]);

  const handleCloseDonationModal = useCallback(() => {
    setIsOpen(false);
    setCoins([]);
    setBusy(false);
  }, []);

  const handleCloseListModal = useCallback(() => {
    setIsListModalOpen(false);
  }, []);

  const handleOpenListModal = useCallback(() => {
    setIsListModalOpen(true);
  }, []);

  const loadMoreDonations = useCallback(async () => {
    if (isLoadingMore || !hasMoreDonations) return;
    
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const data = await fetchDonationsList(nextPage, DEFAULT_DONATIONS_PAGE_SIZE);
      
      if (data.newDonations && data.newDonations.length > 0) {
        setDonations(prev => [...prev, ...data.newDonations]);
        setCurrentPage(nextPage);
        setHasMoreDonations(data.newDonations.length === DEFAULT_DONATIONS_PAGE_SIZE);
      } else {
        setHasMoreDonations(false);
      }
    } catch (error) {
      console.error('Error loading more donations:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMoreDonations, isLoadingMore]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [amountData, listData] = await Promise.allSettled([
          fetchDonationsAmount(),
          fetchDonationsList(1, DEFAULT_DONATIONS_PAGE_SIZE)
        ]);

        if (amountData.status === 'fulfilled') {
          setTotalDonations(amountData.value.totalDonations);
        }

        if (listData.status === 'fulfilled') {
          setDonations(listData.value.newDonations || []);
          setCurrentPage(1);
          setHasMoreDonations(listData.value.newDonations && listData.value.newDonations.length === DEFAULT_DONATIONS_PAGE_SIZE);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    const timeoutId = setTimeout(loadInitialData, 0);
    
    const cleanupEvents = eventsEmitter();
    
    return () => {
      clearTimeout(timeoutId);
      if (cleanupEvents) {
        cleanupEvents();
      }
    };
  }, []);

  return (
    <main>
      <Header onOpenListModal={handleOpenListModal} />
      <section className="container">
        <div className="gift-container">
          <GiftBox isOpen={isOpen} coins={coins} />
        </div>
        <div className="donate-button-container">
          <DonateButton onClick={handleOpenDonationModal} disabled={busy} />
        </div>
        <div className="donation-list-button-container">
          <DonationListButton onClick={handleOpenListModal} />
        </div>
      </section>
      <ModalWrapper
        isOpen={isOpen}
        onClose={handleCloseDonationModal}
        loadingText="Loading donation form..."
      >
        <DonationModal
          isOpen={isOpen}
          onClose={handleCloseDonationModal}
        />
      </ModalWrapper>
      
      <ModalWrapper
        isOpen={isListModalOpen}
        onClose={handleCloseListModal}
        loadingText="Loading donations list..."
      >
        <DonationListModal
          isOpen={isListModalOpen}
          onClose={handleCloseListModal}
          donations={memoizedDonations}
          totalDonations={memoizedTotalDonations}
          onLoadMore={loadMoreDonations}
          hasMore={hasMoreDonations}
          isLoadingMore={isLoadingMore}
        />
      </ModalWrapper>
    </main>
  );
}

export default App;
