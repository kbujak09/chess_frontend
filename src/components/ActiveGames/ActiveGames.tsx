import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Board from '../Board/Board';

import styles from './activegames.module.scss';

const ActiveGames = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);

  const createGame = async () => {
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/create_game`, {
      method: 'POST'
    })
  }

  const getOpenGames = async () => {
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/open_games?userId=${localStorage.userId}`)
    
    if (!req.ok) {
      return;
    };

    const data = await req.json();
    console.log(data)
    setGames(data);
  };

  useEffect(() => {
    getOpenGames();
    console.log(games)
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.games}>
        { games.length === 0 ? <span>theres no active games</span> : <span>found games</span>}
        { games.map((game: any) => {
            if (game.players.white.id !== localStorage.userId && game.players.black.id !== localStorage.userId) {
              return (
                <>
                  <div className={styles.game} onClick={() => navigate(`/game/${game._id}`)}>game</div>
                </>
              )
            }
        })}
      </div>
    </div>
  );
}

export default ActiveGames;