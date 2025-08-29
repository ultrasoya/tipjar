import './App.css';
import { useCallback, useState } from 'react';
import { DonateButton, Header, GiftBox } from './components';
import { DonationModal } from './modal/DonationModal/DonationModal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);

  const handleDonate = useCallback(async () => {
    if (busy) return;
    setBusy(true);

    setIsOpen(true);
    await new Promise((r) => setTimeout(r, 600));

    await new Promise((r) => setTimeout(r, 800));

    setCoins([
      Date.now(),
      Date.now() + 1,
      Date.now() + 2,
      Date.now() + 3,
      Date.now() + 4,
    ]);

    await new Promise((r) => setTimeout(r, 1100));

    setIsOpen(false);
    await new Promise((r) => setTimeout(r, 700));
    setCoins([]);
    setBusy(false);
  }, [busy]);

  return (
    <main>
      <Header />
      <section className="container">
        <GiftBox isOpen={isOpen} coins={coins} />
        <DonateButton onClick={handleDonate} disabled={busy} />
      </section>
      <DonationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDonate={handleDonate}
      />
    </main>
  );
}

export default App;
