import styles from './square.module.scss';

import { useDroppable } from '@dnd-kit/core';

type SquareProps = {
  x: number,
  y: number,
  movePiece: (startPos: number[], endPos: number[]) => void,
  children: React.ReactNode,
};

const Square = ({ x, y, movePiece, children }: SquareProps) => {

  const { setNodeRef } = useDroppable({
    id: `${x},${y}`,
    data: {
      position: [x, y]
    }
  });

  const isDark = (x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0);

  return (
    <div
      ref={setNodeRef}
      className={`${styles.container} ${isDark ? styles.dark : ''}`}
      data-position={`${x},${y}`
      }
    >
      {children}
    </div>
  );
};

export default Square;
