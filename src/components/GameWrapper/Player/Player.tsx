import styles from './player.module.scss';

import ReactLoading from 'react-loading';

import Timer from '../Timer/Times';
import { Dispatch, SetStateAction } from 'react';

type playerPropsType = {
  data: {
    username: string | null,
    id?: string | null,
    color?: string,
    time: number | null,
  },
  isActive: boolean | null,
  setIsOver: Dispatch<SetStateAction<boolean>>
}

const Player = ({data, isActive, setIsOver}: playerPropsType) => {
  return (
    <div className={styles.container}>
      <div className={styles.username}>
        {data.username ? data.username : <Search/>}
      </div>
      <div className={styles.timer}>
        {data.time && <Timer time={Number(data.time.toFixed(0))} isActive={isActive ? true : false} setIsOver={setIsOver} onTimeout={() => {}}/>}
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