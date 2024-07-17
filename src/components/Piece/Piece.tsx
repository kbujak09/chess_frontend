import styles from './piece.module.scss';
import { getPieceImage } from '../../utils/utils';
import { pieceDataType } from '../../types/types';

import { useDraggable } from '@dnd-kit/core';

type pieceProps = {
  data: pieceDataType,
}

const Piece = ({data}: pieceProps) => {
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${data.position[0]},${data.position[1]}`,
    data: {
      position: data.position
    }
  })

  const image = getPieceImage({type: data.type, color: data.color})
  
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0) ${isDragging ? 'scale(1.05)' : ''}`,
        zIndex: 1000,
      }}
      {...listeners}
      {...attributes}
      className={styles.container}>
      <img src={image} alt="piece" className={styles.pieceImage}/>
    </div>
  );
};

export default Piece;
