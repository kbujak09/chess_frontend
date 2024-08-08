import { useState, useEffect } from 'react';

import styles from './activegames.module.scss';

const ActiveGames = () => {
  const [games, setGames] = useState(null);

  const createGame = async () => {
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/create_game`, {
      method: 'POST'
    })
  }

  console.log(process.env.API_IP);

  const getOpenGames = async () => {
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/open_games`)
    
    if (!req.ok) {
      return;
    };

    const data = await req.json();
    setGames(data);
  };

  useEffect(() => {
    getOpenGames();
  }, []);

  return (
    <div className={styles.container}>
      <div onClick={createGame}>create game</div>
    </div>
  );
};

export default ActiveGames;