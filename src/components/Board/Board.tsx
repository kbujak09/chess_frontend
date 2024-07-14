  import styles from './board.module.scss';
  import Piece from '../Piece/Piece';

  import useFetch from '../../hooks/useFetch';
  import { useMemo } from 'react';

  const Board = () => {

    type renderItemType = {
      color: string,
      type: string,
      position: number[]
    }

    const renderBoard = (data: renderItemType[]) => {
      return data.map((item) => {
        return (
          <Piece data={item}/>
        )
      });
    }

    const fetchOptions = useMemo(() => ({
      url: 'http://127.0.0.1:5000/create_game',
      options: {
        method: 'POST'
      }
    }), []);

    const { data, error, loading } = useFetch(fetchOptions);

    return (
      <div className={styles.container}>
        {data && renderBoard(data)} 
      </div>
    )
  };

  export default Board;