  import styles from './board.module.scss';
  import Piece from '../Piece/Piece';
  import { pieceDataType } from '../../types/types';
  import Square from '../Square/Square';

  import useFetch from '../../hooks/useFetch';
  import { useEffect, useMemo, useState } from 'react';
  import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core';

  const Board = () => {
    const [pieces, setPieces] = useState<pieceDataType[]>([])
    const [draggedPiece, setDraggedPiece] = useState<{start: number[], end: number[] | null}>({
      start: [],
      end: null
    })

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
      url: 'http://127.0.0.1:5000/api/create_game',
      options: {
        method: 'POST'
      }
    }), []);

    const onDragStart = (event: DragStartEvent) => {
      const { active }: any = event;
      setDraggedPiece({ start: active.data.current.position, end: null });
    }

    const onDragEnd = (event: DragEndEvent) => {
      const { active, over }: {active: any, over: any} = event;
      if (over) {
        const start = active.data.current.position;
        const end = over.data.current.position;
        movePiece(start, end);
      } 
    };

    const handleSubmit = async () => {
  
      const user = {
        username: 'pablo',
        email: 'pablo@xyz.com',
        password: '1234'
      };
  
      try {
        const response = await fetch('http://127.0.0.1:5000/api/save_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
  
        const result = await response.json();
        console.log('User saved:', result);
      } catch (error) {
        console.error('Error saving user:', error);
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
        <DndContext collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          {data && renderBoard(pieces)}
        </DndContext> 
      </div>
    )
  };

  export default Board;