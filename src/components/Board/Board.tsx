  import styles from './board.module.scss';
  import Piece from '../Piece/Piece';
  import { pieceDataType } from '../../types/types';
  import Square from '../Square/Square';
  import { socket } from '../../socket';

  import { useState, Dispatch, SetStateAction, useEffect } from 'react';
  import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core';

  const moveSelf = require('../../assets/sounds/move-self.mp3');
  const moveEnemy = require('../../assets/sounds/move-opponent.mp3');

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
    gameId: string
  }

  const Board = ({pieces, setPieces, isReversed = false, isDraggable = true, localColor, isActive, setWhiteTimerOn, setBlackTimerOn, turn, setTurn, gameId}: BoardPropsType) => {
    const [draggedPiece, setDraggedPiece] = useState<{start: number[], end: number[] | null}>({
      start: [],
      end: null
    })

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

    const movePiece = async (startPos: number[], endPos: number[]) => {
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

      console.log(data)
      
      setPieces(prevPieces => 
        prevPieces.map(piece => 
          piece.position[0] === startPos[0] && piece.position[1] === startPos[1]
            ? {...piece, position: endPos }
            : piece
        )
      )
    } 

    const emitMove = (startPos: number[], endPos: number[]) => {
      const cords = {position: {start: startPos, end: endPos}, userId: localStorage.userId, room: gameId};
      socket.emit('move', cords);
    }

    const renderBoard = (data: pieceDataType[]) => {
      const boardElements = [];

      if (isReversed) {
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            const position = `${x},${y}`;
            const piece = data.find(item => `${item.position[0]},${item.position[1]}` === position);
      
            boardElements.push(
             <Square key={`${x},${y}`} x={x} y={y} movePiece={movePiece}>
                {piece ? <Piece data={piece}/> : null}
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
           <Square key={`${x},${y}`} x={x} y={y} movePiece={movePiece}>
              {piece ? <Piece data={piece}/> : null}
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
    const onDragEnd = (event: DragEndEvent) => {
      if (!isDraggable) return;
      const { active, over }: {active: any, over: any} = event;
      const pieceColor = active.data.current.color
      if (localColor !== pieceColor) return;
      if (over) {
        const start = active.data.current.position;
        const end = over.data.current.position;
        if (start[0] === end[0] && start[1] === end[1]) return;
        movePiece(start, end);
        emitMove(start, end);
        changeTurn();
      } 
    };

    const getEnemyMove = (data: any) => {
        if (data.userId === localStorage.userId) return;
        movePiece(data.pos.start, data.pos.end);
        changeTurn();
    }

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