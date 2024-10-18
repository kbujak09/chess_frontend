import styles from './gamewrapper.module.scss';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Game from './Game/Game';
const gameStartAudio = require('../../assets/game-start.mp3');

type PlayerType = {
  id: string | null,
  username: string | null,
  time: number | null
};

type PlayersType = {
  white: PlayerType,
  black: PlayerType
}

const GameWrapper = () => {
  const location = useLocation();

  const gameId = location.pathname.split('/')[2];

  const [board, setBoard] = useState([]);
  const [players, setPlayers] = useState<PlayersType>({
    white: { id: null, username: null, time: null},
    black: { id: null, username: null, time: null},
  });
  const [localColor, setLocalColor] = useState('');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameStatus, setGameStatus] = useState('');

  const [whiteTimerOn, setWhiteTimerOn] = useState<boolean>(false);
  const [blackTimerOn, setBlackTimerOn] = useState<boolean>(false);

  const [turn, setTurn] = useState<string>('');

  const findLocalColor = (players: PlayerType[]) => {
    for (let [key, values] of Object.entries(players)) {
      if (values.id === localStorage.userId) {
        return setLocalColor(key);
      }
    }
    for (let [key, values] of Object.entries(players)) {
      if (!values.id && values.id !== localStorage.userId) {
        console.log(key)
        return setLocalColor(key);
      }
    }
  }

  const changeGameStatus = async (status: string) => {
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/games/${gameId}/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'status': status})
    }); 

    const data = await req.json();

    return data.message;
  }

  // fetch initial data and set states
  useEffect(() => {
    try {
      const fetchData = async () => {
        const req = await fetch(`${process.env.REACT_APP_API_IP}/api/games/${gameId}`);
  
        const data = await req.json();

        if (!req.ok) {
          throw new Error('Error while fetching game data');
        }

        if (data) {
          setPlayers(data.players);
          setBoard(data.board);
          setGameStatus(data.status);
          findLocalColor(data.players);
          setTurn(data.current_turn);
        }
      }
      fetchData();
    }
    catch (err) {
      console.error(err);
    }
  }, []);

  // useEffect(() => {
  //   return () => {

  //   }
  // }, []);

  // start the game when both players join
  useEffect(() => {
    if (players.white.id && players.black.id) { 
      setGameStarted(true);
      if (turn === 'white') {
        setWhiteTimerOn(true); 
      }
      else {
        setBlackTimerOn(true); 
      }
      if (gameStatus === 'open') {
        setTimeout(() => {
          const startAudio = new Audio(gameStartAudio);
          startAudio.play();
          changeGameStatus('live');
        }, 1000);
      }
    }
  }, [players])

  return (
    <div className={styles.container}>
      {board && players && localColor && 
      <Game 
        board={board}
        setBoard={setBoard} 
        players={players} 
        localColor={localColor} 
        setPlayers={setPlayers} 
        gameId={gameId}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
        whiteTimerOn={whiteTimerOn}
        blackTimerOn={blackTimerOn}
        setWhiteTimerOn={setWhiteTimerOn}
        setBlackTimerOn={setBlackTimerOn}
        setTurn={setTurn}
        turn={turn}
      />}
    </div>
  );
};

export default GameWrapper;