import styles from './footer.module.scss';
const Footer = () => {

  const text = 'Kacper Bujak © 2024'

  return (
    <footer className={styles.text}>
      { text }
    </footer>
  );
};

export default Footer;