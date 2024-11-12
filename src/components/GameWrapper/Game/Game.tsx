import styles from './game.module.scss';

import { Dispatch, SetStateAction, useEffect } from 'react';

import Player from '../Player/Player';
import Board from '../../Board/Board';
import { socket } from '../../../socket';

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
  board: any[],
  setBoard: Dispatch<SetStateAction<any>>
  players: PlayersType,
  localColor: string,
  setPlayers: Dispatch<SetStateAction<PlayersType>>,
  gameId: string,
  gameStarted: boolean,
  setGameStarted: Dispatch<SetStateAction<boolean>>,
  whiteTimerOn: boolean,
  blackTimerOn: boolean,
  setWhiteTimerOn: Dispatch<SetStateAction<boolean>>,
  setBlackTimerOn: Dispatch<SetStateAction<boolean>>,
  turn: string,
  setTurn: Dispatch<SetStateAction<string>>,
  increment: number,
  setPlayerTime: (color: 'black'|'white') => void
}

const Game = ({board, setBoard, players, localColor, setPlayers, gameId, gameStarted, setGameStarted, whiteTimerOn, blackTimerOn, setBlackTimerOn, setWhiteTimerOn, setTurn, turn, increment, setPlayerTime}: GameProps) => {
  
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
        <Player data={players.black} isActive={blackTimerOn}/>
        <Board 
          pieces={board} 
          setPieces={setBoard} 
          localColor={localColor} 
          isDraggable={gameStarted && turn === 'white' ? true : false} 
          isActive={gameStarted ? true : false} 
          setWhiteTimerOn={setWhiteTimerOn}
          setBlackTimerOn={setBlackTimerOn}
          turn={turn}  
          setTurn={setTurn}
          gameId={gameId}
          increment={increment}
          setPlayerTime={setPlayerTime}
        />
        <Player data={players.white} isActive={whiteTimerOn}/> 
      </>
      :
      <>
        <Player data={players.white} isActive={whiteTimerOn}/>
        <Board 
          pieces={board} 
          setPieces={setBoard} 
          localColor={localColor} 
          isReversed={true} 
          isDraggable={gameStarted && turn === 'black' ? true : false} 
          isActive={gameStarted ? true : false}
          setWhiteTimerOn={setWhiteTimerOn}
          setBlackTimerOn={setBlackTimerOn}
          turn={turn}
          setTurn={setTurn} 
          gameId={gameId} 
          increment={increment}
          setPlayerTime={setPlayerTime}
        />
        <Player data={players.black} isActive={blackTimerOn}/> 
      </>
      }
    </div>
  ) 
}

export default Game;