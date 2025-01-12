import styles from './game.module.scss';

import { useEffect, useContext } from 'react';

import Player from '../Player/Player';
import Board from '../Board/Board';
import { socket } from '../../../socket';
import { GameContext } from '../../../context/GameContext';

type PlayerType = {
  id: string | null,
  username: string | null,
  time: number | null
}

type PlayersType = {
  white: PlayerType,
  black: PlayerType
}

type GameProps = {
  gameId: string,
  setPlayersTime: (data: PlayersType) => void,
}

const Game = ({gameId, setPlayersTime}: GameProps) => {

  const { 
    players, 
    localColor, 
    setPlayers, 
    gameStarted, 
    whiteTimerOn, 
    blackTimerOn, 
    turn, 
    setIsOver 
  } = useContext(GameContext);
  
  function handlePlayerJoined(data: PlayerType) {
    setPlayers((prevPlayers: any) => {
      if (prevPlayers.white.id === data.id || prevPlayers.black.id === data.id) {
        return prevPlayers;
      }

      const updatedPlayers = { ...prevPlayers };
  
      if (updatedPlayers.white.id === null && updatedPlayers.white.username === null) {
        updatedPlayers.white.id = data.id;
        updatedPlayers.white.username = data.username;
      } else if (updatedPlayers.black.id === null && updatedPlayers.black.username === null) {
        updatedPlayers.black.id = data.id;
        updatedPlayers.black.username = data.username;
      }
  
      return updatedPlayers;
    });
  }

  const joinRoomRequest = async () => {
    socket.emit('join', { 'id': localStorage.userId, 'username': localStorage.username, 'room': gameId });

    if (players.white.id === localStorage.userId || players.black.id === localStorage.userId) {
      return;
    }

    await fetch(`${process.env.REACT_APP_API_IP}/api/games/${gameId}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player: {
          username: localStorage.username,
          id: localStorage.userId
        }})
    }); 
  }

  useEffect(() => {
    socket.on('playerJoined', handlePlayerJoined)
    return () => {
      socket.off('playerJoined', handlePlayerJoined)
    }
  }, []);

  useEffect(() => {
    joinRoomRequest();
  }, []);

  return (
    players && <div className={styles.container}>
      {localColor === 'white' ? 
      <>
        <Player data={players.black} isActive={blackTimerOn} setIsOver={setIsOver}/>
          <Board 
            isDraggable={gameStarted && turn === 'white' ? true : false} 
            isActive={gameStarted ? true : false} 
            gameId={gameId}
            setPlayersTime={setPlayersTime}
          />
        <Player data={players.white} isActive={whiteTimerOn} setIsOver={setIsOver}/> 
      </>
      :
      <>
        <Player data={players.white} isActive={whiteTimerOn} setIsOver={setIsOver}/>
          <Board 
            isDraggable={gameStarted && turn === 'black' ? true : false} 
            isActive={gameStarted ? true : false} 
            gameId={gameId}
            setPlayersTime={setPlayersTime}
            isReversed={true}
          />
        <Player data={players.black} isActive={blackTimerOn} setIsOver={setIsOver}/> 
      </>
      }
    </div>
  ) 
}

export default Game;