import styles from './board.module.scss';
import useFetch from '../../hooks/useFetch';
import { useMemo } from 'react';

const Board = () => {
  const fetchOptions = useMemo(() => ({
    url: 'http://127.0.0.1:5000/create_game',
    options: {
      method: 'POST'
    }
  }), []);

  const { data, error, loading } = useFetch(fetchOptions);

  console.log(data);

  return (
    <div className={styles.container}></div>
  )
};

export default Board;