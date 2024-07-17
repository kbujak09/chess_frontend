  import styles from './board.module.scss';
  import Piece from '../Piece/Piece';
  import { pieceDataType } from '../../types/types';
  import Square from '../Square/Square';

  import useFetch from '../../hooks/useFetch';
  import { useEffect, useMemo, useState } from 'react';
  import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';

  const Board = () => {
    const [pieces, setPieces] = useState<pieceDataType[]>([])

    const renderBoard = (data: pieceDataType[]) => {
      const boardElements = [];
    
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

    const movePiece = (startPos: number[], endPos: number[]) => {
      setPieces(prevPieces => 
        prevPieces.map(piece => 
          piece.position[0] === startPos[0] && piece.position[1] === startPos[1]
            ? {...piece, position: endPos }
            : piece
        )
      )
    }
    
    const fetchOptions = useMemo(() => ({
      url: 'http://127.0.0.1:5000/create_game',
      options: {
        method: 'POST'
      }
    }), []);

    const onDragEnd = (event: DragEndEvent) => {
      const { active, over }: {active: any, over: any} = event;
      if (over) {
        const start = active.data.current.position;
        const end = over.data.current.position;
        movePiece(start, end);
      } 
    };

    const { data, error, loading } = useFetch(fetchOptions);

    useEffect(() => {
      if (data) {
        setPieces(data);
      }
    }, [data]);

    return (
      <div className={styles.container}>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          {data && renderBoard(pieces)}
        </DndContext> 
      </div>
    )
  };

  export default Board;