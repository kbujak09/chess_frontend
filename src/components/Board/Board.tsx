import { PlayersType } from '../GameWrapper/GameWrapper';

import styles from './board.module.scss';
import Piece from '../Piece/Piece';
import { pieceDataType } from '../../types/types';
import Square from '../Square/Square';
import { socket } from '../../socket';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core';

const moveSelfSound = require('../../assets/sounds/move-self.mp3');
const moveEnemySound = require('../../assets/sounds/move-opponent.mp3');
const takeSound = require('../../assets/sounds/capture.mp3');
const castleSound = require('../../assets/sounds/castle.mp3');
const checkSound = require('../../assets/sounds/move-check.mp3');

type BoardPropsType = {
  pieces?: pieceDataType[], 
  setPieces: Dispatch<SetStateAction<pieceDataType[]>>
  isReversed?: boolean, 
  isDraggable?: boolean, 
  localColor: string, 
  isActive: boolean,
  setBlackTimerOn: Dispatch<SetStateAction<boolean>>,
  setWhiteTimerOn: Dispatch<SetStateAction<boolean>>,
  turn: string,
  setTurn: Dispatch<SetStateAction<string>>,
  gameId: string,
  increment: number,
  setPlayersTime: (data: PlayersType) => void,
  setIsOver: Dispatch<SetStateAction<boolean>>
}

const Board = ({pieces, setPieces, isReversed = false, isDraggable = true, localColor, isActive, setWhiteTimerOn, setBlackTimerOn, turn, setTurn, gameId, increment, setPlayersTime, setIsOver}: BoardPropsType) => {
  const [draggedPiece, setDraggedPiece] = useState<{start: number[], end: number[] | null}>({
    start: [],
    end: null
  });

  const changeTurn = () => {
    if (turn === 'white') {
      setWhiteTimerOn(false);
      setTurn('black');
      setBlackTimerOn(true);
    }
    else {
      setBlackTimerOn(false);
      setTurn('white');
      setWhiteTimerOn(true);
    }
  }

  const verifyMove = async (startPos: number[], endPos: number[]) => {
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/games/${gameId}/moves`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        moveData: {
          start: startPos,
          end: endPos
        }
      })
    });

    const data = await req.json();

    return data;
  }

  const movePieceDOM = (startPos: number[], endPos: number[]) => {
    setPieces(prevPieces => {
      return prevPieces
        .filter(piece => !(piece.position[0] === endPos[0] && piece.position[1] === endPos[1]))
        .map(piece => {
          if (piece.position[0] === startPos[0] && piece.position[1] === startPos[1]) {
            return { ...piece, position: endPos };
          }
          return piece;
        });
    });
  };

  const movePiece = async (startPos: number[], endPos: number[]) => {
    const oldPieces: any = pieces;

    const data: any = await verifyMove(startPos, endPos);

    if (data.status) {
      setPieces(data.board);
      changeTurn();
      emitMove(startPos, endPos, data.type, data.gameStatus, data.board, data.players);
      setPlayersTime(data.players)
      console.log(data);
    } 
    else {
      setPieces(oldPieces);
    }

    return {
      'status': data.status, 
      'sound': data.type ? data.type : 'enemyMove', 
      'timestamps': {
        'white': data.players.white.time,
        'black': data.players.black.time
      }
    };
  }

  const renderBoard = (data: pieceDataType[]) => {
    const boardElements = [];

    if (isReversed) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          const position = `${x},${y}`;
          const piece = data.find(item => `${item.position[0]},${item.position[1]}` === position);
    
          boardElements.push(
            <Square key={`${x},${y}`} x={x} y={y}>
              {piece ? <Piece data={piece} /> : null}
            </Square>
          );
        }
      }
      return boardElements;
    }
  
    for (let x = 7; x >= 0; x--) {
      for (let y = 0; y < 8; y++) {
        const position = `${x},${y}`;
        const piece = data.find(item => `${item.position[0]},${item.position[1]}` === position);
  
        boardElements.push(
          <Square key={`${x},${y}`} x={x} y={y}>
            {piece ? <Piece data={piece} /> : null}
          </Square>
        );
      }
    }
  
    return boardElements;
  };

  const onDragStart = (event: DragStartEvent) => {
    if (!isDraggable || !isActive) return;
    const { active }: any = event;
    const pieceColor = active.data.current.color
    if (localColor !== pieceColor) return;
    setDraggedPiece({ start: active.data.current.position, end: null });
  }
  const onDragEnd = async (event: DragEndEvent) => {
    if (!isDraggable) return;
    const { active, over }: {active: any, over: any} = event;
    const pieceColor = active.data.current.color
    if (localColor !== pieceColor) return;
    if (over) {
      const start = active.data.current.position;
      const end = over.data.current.position;
      if (start[0] === end[0] && start[1] === end[1]) return; 
      movePieceDOM(start,end);
      const move = await movePiece(start, end);
      if (move.status) {
        playMoveSound(move.sound);
      }
    } 
  };

  const emitMove = (startPos: number[], endPos: number[], type: string, gameStatus: string, pieces: pieceDataType[] | undefined, players: PlayersType) => {
    const data = {
      position: {start: startPos, end: endPos},
      userId: localStorage.userId, 
      room: gameId,
      type: type, 
      gameStatus: gameStatus, 
      board: pieces,
      players: players
    };
    socket.emit('move', data);
  }

  const getEnemyMove = async (data: any) => {
    if (data.userId === localStorage.userId) return;
    setPieces(data.board);
    changeTurn();
    playMoveSound(data.type);
    setPlayersTime(data.players)
    if (data.status === 'black won' || data.status === 'white won') {
      setIsOver(true);
    }
  }

  function playMoveSound (type: 'move'|'enemyMove'|'castle'|'take'|'check') {
    switch (type) {
      case 'move':
        const localMove = new Audio(moveSelfSound);
        localMove.play();
        break;
      case 'enemyMove':
        const enemyMove = new Audio(moveEnemySound);
        enemyMove.play();
        break;
      case 'take':
        const take = new Audio(takeSound);
        take.play();
        break;
      case 'castle':
        const castle = new Audio(castleSound);
        castle.play();
        break;
      case 'check':
        const check = new Audio(checkSound);
        check.play();
        break;
    }
  }

  const syncGame = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_IP}/api/games/${gameId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch game');
      }
      const data: any = await res.json();
      setPlayersTime(data.players);
      setPieces(data.board.positions);
    } catch (error) {
      console.error('Error syncing timers:', error);
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      syncGame();
    };

    window.addEventListener('visibilitychange', handleFocus);

    return () => {
      window.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  useEffect(() => {
    socket.on('enemyMoved', getEnemyMove);
    return () => {
      socket.off('enemyMoved', getEnemyMove);
    }
  });

  return (
    <div className={`${styles.container} ${!isActive ? styles.locked : null}`}>
      <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {pieces ? renderBoard(pieces) : null}
      </DndContext> 
    </div>
  )
};

export default Board;