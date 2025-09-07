import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { DonateButton, Header, GiftBox } from './components';
import { DonationModal } from './modal/DonationModal/DonationModal';
import { DonationListModal } from './modal/DonationListModal/DonationListModal';
import { eventsEmitter, fetchDonationsAmount, fetchDonationsList } from './utils';
import type { Donation } from '@shared/types/contracts';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [coins, setCoins] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [totalDonations, setTotalDonations] = useState('');

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

  useEffect(() => {
    fetchDonationsAmount().then((data) => {
      setTotalDonations(data.totalDonations);
    });
    fetchDonationsList().then((data) => {
      setDonations(data.newDonations);
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
      />
    </main>
  );
}

export default App;
