import styles from './player.module.scss';

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
        {data.username}
      </div>
      <div className={styles.timer}>
        <Timer time={300} isActive={false} onTimeout={() => {}}/>
      </div>
    </div>
  );
};

export default Player;