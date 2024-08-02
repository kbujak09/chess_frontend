import { Link } from 'react-router-dom';

import styles from './welcome.module.scss';

const Welcome = ({text, linkText}: {text: string, linkText: string}) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {text}
      </div>
      <Link to='auth' className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
};

export default Welcome;