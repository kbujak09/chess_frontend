import styles from './game.module.scss';
import Board from '../Board/Board';

const Game = ({ id }: { id: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <Board />
      </div>
    </div>
  )
};

export default Game;