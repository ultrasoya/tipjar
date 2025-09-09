import DonationListButton from '../DonationListButton';

import type { Donation } from '@shared/types/contracts';
import styles from './styles.module.css';

interface HeaderProps {
    donations: Donation[];
    onOpenListModal: () => void;
}

const Header = ({ donations, onOpenListModal }: HeaderProps) => {
    return (
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Crypto Gift Box</h1>
                <p className={styles.subtitle}>Make a donation and watch the magic happen</p>
            </header>
            <div className={styles.desktopButton}>
                <DonationListButton onClick={onOpenListModal} donations={donations} />
            </div>
        </div>
    );
};

export default Header;