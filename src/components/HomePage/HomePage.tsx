import Greeting from '../Greeting/Greeting';
import ActiveGames from '../ActiveGames/ActiveGames';
import Creators from '../Creators/Creators';

import styles from './homepage.module.scss';

const HomePage = () => {

  return (
    <div className={styles.container}>
      <Greeting />
      <Creators />
      <ActiveGames />
    </div>
  );
};

export default HomePage;