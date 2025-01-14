import bishop_b from '../../src/assets/pieces/bishop-b.svg';
import bishop_w from '../../src/assets/pieces/bishop-w.svg';
import king_b from '../../src/assets/pieces/king-b.svg';
import king_w from '../../src/assets/pieces/king-w.svg';
import knight_b from '../../src/assets/pieces/knight-b.svg';
import knight_w from '../../src/assets/pieces/knight-w.svg';
import pawn_b from '../../src/assets/pieces/pawn-b.svg';
import pawn_w from '../../src/assets/pieces/pawn-w.svg';
import queen_b from '../../src/assets/pieces/queen-b.svg';
import queen_w from '../../src/assets/pieces/queen-w.svg';
import rook_b from '../../src/assets/pieces/rook-b.svg';
import rook_w from '../../src/assets/pieces/rook-w.svg';

 const getPieceImage = ({type, color}: {type: string, color: string}): string => {
  switch (type) {
    case 'bishop':
      return color === 'black' ? bishop_b : bishop_w;
    case 'king':
      return color === 'black' ? king_b : king_w;
    case 'knight':
      return color === 'black' ? knight_b : knight_w;
    case 'pawn':
      return color === 'black' ? pawn_b : pawn_w;
    case 'queen':
      return color === 'black' ? queen_b : queen_w;
    case 'rook':
      return color === 'black' ? rook_b : rook_w;
    default:
      throw new Error('Invalid piece type or color');
  }
};

 const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export { getPieceImage, formatTime };