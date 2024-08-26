import { useLocation } from 'react-router-dom';

import styles from './game.module.scss';
import Board from '../Board/Board';
import useFetch from '../../hooks/useFetch';
import Player from './Player/Player';
import { useEffect, useState } from 'react';

type playerType = {
  username: string,
  id: string
};

const Game = () => {
  const pathname = useLocation().pathname.split('/');
  const id = pathname[pathname.length - 1];

  const [localColor, setLocalColor] = useState('');

  const {data, error, loading} = useFetch({
    url: `${process.env.REACT_APP_API_IP}/api/game/${id}`
  });

  useEffect(() => {
    if (data) {
      for (const [key, value] of Object.entries(data.players)) {
        let player: any = value;
        if (player.id === localStorage.userId) {
          setLocalColor(key);
        }
      }
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {data !== null ? (
          localColor === 'white' ? (
            <>
              <Player data={data.players.black} />
              <Board pieces={data.board} />
              <Player data={data.players.white} />
            </>
          ) : (
            <>
              <Player data={data.players.white} />
              <Board pieces={data.board} isReversed={true} />
              <Player data={data.players.black} />
            </>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Game;