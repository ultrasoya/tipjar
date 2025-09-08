import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { DonateButton, Header, GiftBox } from './components';
import { DonationModal } from './modal/DonationModal/DonationModal';
import { DonationListModal } from './modal/DonationListModal/DonationListModal';
import { eventsEmitter, fetchDonationsAmount, fetchDonationsList } from './utils';
import { DEFAULT_DONATIONS_PAGE_SIZE } from './constants';
import type { Donation } from '@shared/types/contracts';

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
        // Graph API не возвращает hasMore, используем старую логику
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
    fetchDonationsAmount().then((data) => {
      setTotalDonations(data.totalDonations);
    });
    fetchDonationsList(1, DEFAULT_DONATIONS_PAGE_SIZE).then((data) => {
      setDonations(data.newDonations || []);
      setCurrentPage(1);
      // Graph API не возвращает hasMore, используем старую логику
      setHasMoreDonations(data.newDonations && data.newDonations.length === DEFAULT_DONATIONS_PAGE_SIZE);
    });
    
    // Подписываемся на события о новых донатах
    const cleanupEvents = eventsEmitter();
    
    // Cleanup функция для закрытия EventSource при размонтировании
    return () => {
      if (cleanupEvents) {
        cleanupEvents();
      }
    };
  }, []);

  return (
    <main>
      <Header donations={donations} onOpenListModal={handleOpenListModal} />
      <section className="container">
        <GiftBox isOpen={isOpen} coins={coins} />
        <DonateButton onClick={handleOpenDonationModal} disabled={busy} />
      </section>
      <DonationModal
        isOpen={isOpen}
        onClose={handleCloseDonationModal}
      />
      <DonationListModal
        isOpen={isListModalOpen}
        onClose={handleCloseListModal}
        donations={donations}
        totalDonations={totalDonations}
        onLoadMore={loadMoreDonations}
        hasMore={hasMoreDonations}
        isLoadingMore={isLoadingMore}
      />
    </main>
  );
}

export default App;
