import styles from './player.module.scss';

import ReactLoading from 'react-loading';

import Timer from '../Timer/Times';

type playerPropsType = {
  data: {
    username: string | null,
    id?: string | null,
    color?: string,
    time: number | null,
  },
  isActive: boolean | null,
}

const Player = ({data, isActive}: playerPropsType) => {
  return (
    <div className={styles.container}>
      <div className={styles.username}>
        {data.username ? data.username : <Search/>}
      </div>
      <div className={styles.timer}>
        {data.time && <Timer time={data.time} isActive={isActive ? true : false} onTimeout={() => {}}/>}
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