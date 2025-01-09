import { createContext, Dispatch, SetStateAction, useState } from "react";

import { PlayersType } from "../types/types";

type Children = {
  children: JSX.Element
}

type GameContextType = {
  board: any, 
  setBoard: Dispatch<SetStateAction<any>>, 
  players: PlayersType, 
  setPlayers: Dispatch<SetStateAction<PlayersType>>, 
  localColor: string, 
  setLocalColor: Dispatch<SetStateAction<string>>,
  gameStarted: boolean,
  setGameStarted: Dispatch<SetStateAction<boolean>>,
  gameStatus: string,
  setGameStatus: Dispatch<SetStateAction<string>>,
  isOver: boolean,
  setIsOver: Dispatch<SetStateAction<boolean>>,
  whiteTimerOn: boolean,
  setWhiteTimerOn: Dispatch<SetStateAction<boolean>>,
  blackTimerOn: boolean,
  setBlackTimerOn: Dispatch<SetStateAction<boolean>>,
  increment: number,
  setIncrement: Dispatch<SetStateAction<number>>,
  turn: string,
  setTurn: Dispatch<SetStateAction<string>>
}

const defaultValue = {
  test: ''
}

export const GameContext = createContext<GameContextType>(defaultValue);

const GameContextProvider = ({children}: Children) => {
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

  return (
    <GameContext.Provider value={{
      board, 
      setBoard, 
      players, 
      setPlayers, 
      localColor, 
      setLocalColor,
      gameStarted,
      setGameStarted,
      gameStatus,
      setGameStatus,
      isOver,
      setIsOver,
      whiteTimerOn,
      setWhiteTimerOn,
      blackTimerOn,
      setBlackTimerOn,
      increment,
      setIncrement,
      turn,
      setTurn
    }}>
      {children}
    </GameContext.Provider>
  )
};

export default GameContextProvider;