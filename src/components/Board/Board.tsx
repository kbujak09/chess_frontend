  import styles from './board.module.scss';
  import Piece from '../Piece/Piece';
  import { pieceDataType } from '../../types/types';
  import Square from '../Square/Square';

  import { useState } from 'react';
  import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core';

  const Board = ({pieces: initialPieces, isReversed = false, isDraggable = true, localColor }: {pieces?: pieceDataType[], isReversed?: boolean, isDraggable?: boolean, localColor: string}) => {
    const [pieces, setPieces] = useState<pieceDataType[]>(initialPieces || []);
    const [draggedPiece, setDraggedPiece] = useState<{start: number[], end: number[] | null}>({
      start: [],
      end: null
    })

    const movePiece = (startPos: number[], endPos: number[]) => {
      setPieces(prevPieces => 
        prevPieces.map(piece => 
          piece.position[0] === startPos[0] && piece.position[1] === startPos[1]
            ? {...piece, position: endPos }
            : piece
        )
      )
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
      if (!isDraggable) return;
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
        movePiece(start, end);
      } 
    };

    // idk why its there :|

    // const handleSubmit = async () => {
  
    //   const user = {
    //     username: 'pablo',
    //     email: 'pablo@xyz.com',
    //     password: '1234'
    //   };
  
    //   try {
    //     const response = await fetch(`${process.env.REACT_APP_API_IP}/api/save_user`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(user),
    //     });
  
    //     const result = await response.json();
    //     console.log('User saved:', result);
    //   } catch (error) {
    //     console.error('Error saving user:', error);
    //   }
    // };

    return (
      <div className={styles.container}>
        <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {!pieces && initialPieces ? renderBoard(initialPieces) : renderBoard(pieces)}
        </DndContext> 
      </div>
    )
  };

  export default Board;