import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

import Greeting from './Greeting/Greeting';
import ActiveGames from './ActiveGames/ActiveGames';
import Creators from './Creators/Creators';
import { UserContext } from '../../context/UserContext';

import styles from './homepage.module.scss';

const HomePage = () => {
  const { user } = useContext(UserContext);

  if (!user.token) {
    return (
      <Navigate to='/'/>
    )
  }

  return (
    <div className={styles.container}>
      <Greeting />
      <Creators />
      <ActiveGames />
    </div>
  );
};

export default HomePage;