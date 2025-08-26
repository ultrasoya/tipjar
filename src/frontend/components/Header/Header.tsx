import styles from './styles.module.css';

const Header = () => (
    <header className={styles.header}>
        <h1 className={styles.title}>Crypto Gift Box</h1>
        <p className={styles.subtitle}>Make a donation and watch the magic happen</p>
    </header>
);

export default Header;