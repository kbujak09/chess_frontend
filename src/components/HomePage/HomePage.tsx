import Greeting from '../Greeting/Greeting';
import ActiveGames from '../ActiveGames/ActiveGames';

import styles from './homepage.module.scss';

const HomePage = () => {

  return (
    <div className={styles.container}>
      <Greeting />
      <ActiveGames />
    </div>
  );
};

export default HomePage;