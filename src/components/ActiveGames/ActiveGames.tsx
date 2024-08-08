import styles from './activegames.module.scss';

const ActiveGames = () => {

  const createGame = async () => {
    const req = await fetch('http://127.0.0.1:5000/api/create_game', {
      method: 'POST'
    })
  }

  return (
    <div className={styles.container}>
      <div onClick={createGame}>create game</div>
    </div>
  );
};

export default ActiveGames;