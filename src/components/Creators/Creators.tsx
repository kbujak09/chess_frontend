import GameCreator from '../GameCreator/GameCreator';

import styles from './creators.module.scss'

const Creators = () => {
  return (
    <div className={styles.container}>
      <div className='title'>play quick game</div>
      <div className={styles.grid}>
        <GameCreator minutes={2} increment={1}/>
        <GameCreator minutes={5} increment={2}/>
        <GameCreator minutes={10}/>
      </div>
    </div>
  );
};

export default Creators;