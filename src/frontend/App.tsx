import './App.css';
import { useCallback, useState } from 'react';
import { DonateButton, Header, GiftBox } from './components';

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

    // Убираем задержку - монетки исчезают сразу после падения
    await new Promise((r) => setTimeout(r, 1100)); // Ждем только время падения монетки

    setIsOpen(false);
    await new Promise((r) => setTimeout(r, 700));
    setCoins([]);
    setBusy(false);
  }, [busy]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '40px 0' }}>
        <GiftBox isOpen={isOpen} coins={coins} />
        <DonateButton onClick={handleDonate} disabled={busy} />
      </div>
    </>
  );
}

export default App;
