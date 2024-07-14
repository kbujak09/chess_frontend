import styles from './piece.module.scss';

type dataType = {
  color: string,
  type: string,
  position: number[]
}

type pieceProps = {
  data: dataType
}

const Piece = ({data}: pieceProps) => {
  console.log(data.type)
  return (
    <div>{data.type}</div>
  );
};

export default Piece;