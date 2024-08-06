import { useContext } from 'react';
import styles from './homepage.module.scss';
import { UserContext } from '../../context/context';
import ProfileCard from '../Profile/ProfileCard/ProfileCard';

const HomePage = () => {

  const { setUser } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <div onClick={() => {localStorage.clear(); setUser({id: '', username: ''})}}>log out</div>
      <ProfileCard />
    </div>
  );
};

export default HomePage;