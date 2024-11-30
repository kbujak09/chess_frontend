import styles from './gameover.module.scss';

const GameOver = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.message}>GAME OVER</div>
        <button className={styles.button} type='button'>Back to main menu</button>
      </div>
    </div>
  );
};

export default GameOver;