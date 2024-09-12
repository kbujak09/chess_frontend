import styles from './player.module.scss';

import ReactLoading from 'react-loading';

import Timer from '../Timer/Times';

type playerPropsType = {
  data: {
    username: string,
    id?: string
  }
}

const Player = ({data}: playerPropsType) => {
  return (
    <div className={styles.container}>
      <div className={styles.username}>
        {data.username ? data.username : <Search/>}
      </div>
      <div className={styles.timer}>
        <Timer time={300} isActive={false} onTimeout={() => {}}/>
      </div>
    </div>
  );
};

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.loader}>
        <ReactLoading type='bubbles' width={'36px'} height={'24px'}/>
      </div>
    </div>
  )
}

export default Player;