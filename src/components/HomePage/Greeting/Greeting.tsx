import { useContext } from 'react';
import styles from './greeting.module.scss';
import LogOut from '../LogOut/LogOut';
import { UserContext } from '../../../context/UserContext';

const Greeting = () => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div>
        Hello, <span className={styles.username}>{user.username}</span>
      </div>
      <LogOut/>
    </div>
  );
};

export default Greeting;