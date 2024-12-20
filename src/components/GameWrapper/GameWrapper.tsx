import styles from './gamewrapper.module.scss';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Game from './Game/Game';
import GameOver from '../GameOver/GameOver';
const gameStartAudio = require('../../assets/sounds/game-start.mp3');

type PlayerType = {
  id: string | null,
  username: string | null,
  time: number | null
};

export type PlayersType = {
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
  const [isOver, setIsOver] = useState<boolean>(false);

  const [whiteTimerOn, setWhiteTimerOn] = useState<boolean>(false);
  const [blackTimerOn, setBlackTimerOn] = useState<boolean>(false);

  const [increment, setIncrement] = useState<number>(0);

  const [turn, setTurn] = useState<string>('');

  const findLocalColor = (players: PlayerType[]) => {
    for (let [key, values] of Object.entries(players)) {
      if (values.id === localStorage.userId) {
        return setLocalColor(key);
      }
    }
    for (let [key, values] of Object.entries(players)) {
      if (!values.id && values.id !== localStorage.userId) {
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

  const setPlayersTime = (data: PlayersType) => {
    setPlayers(prevPlayers => {
      return {
        white: {
          ...prevPlayers.white,
          time: data.white.time
        },
        black: {
          ...prevPlayers.black,
          time: data.black.time
        }
      }
    });
  }

  const checkIsOver = async (gameId: string) => {
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/games/${gameId}/status`, {
      method: 'GET'
    });

    const data = await req.json();

    console.log(data);
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
          setBoard(data.board.positions);
          setGameStatus(data.status);
          findLocalColor(data.players);
          setTurn(data.current_turn);
          setIncrement(data.increment);
        }
      }
      fetchData();
    }
    catch (err) {
      console.error(err);
    }
  }, []);


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
  }, [players.white.id, players.black.id])

  useEffect(() => {
    if (isOver) {
      checkIsOver(gameId);
    }
  }, [isOver]);

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
        increment={increment}
        setPlayersTime={setPlayersTime}
        setIsOver={setIsOver}
        isOver={isOver}
      />}
      {isOver ? <GameOver/> : null}
    </div>
  );
};

export default GameWrapper;