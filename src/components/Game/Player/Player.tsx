import styles from './player.module.scss';

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
    </div>
  );
};

export default Player;