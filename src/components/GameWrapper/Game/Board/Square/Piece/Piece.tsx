import styles from './piece.module.scss';
import { getPieceImage } from '../../../../../../utils/utils';
import { pieceDataType } from '../../../../../../types/types';

import { useDraggable } from '@dnd-kit/core';
import { useEffect, useState } from 'react';

type pieceProps = {
  data: pieceDataType,
}

const Piece = ({data}: pieceProps) => {
  const [resetPiece, setResetPiece] = useState<Boolean>(false); 
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${data.position[0]},${data.position[1]}`,
    data: {
      position: data.position,
      color: data.color,
    }
  })

  const image = getPieceImage({type: data.type, color: data.color});

  useEffect(() => {
    if (!isDragging) {
      setResetPiece(true);
    }
    else {
      setResetPiece(false);
    }
  }, [isDragging]);
  
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: resetPiece ? 'none' : `translate3d(${transform?.x}px, ${transform?.y}px, 0) ${isDragging ? 'scale(1.05)' : ''}`,
        zIndex: isDragging ? 100 : 1,
      }}
      {...listeners}
      {...attributes}
      className={styles.container}>
      <img src={image} alt="piece" className={styles.pieceImage}/>
    </div>
  );
};

export default Piece;
