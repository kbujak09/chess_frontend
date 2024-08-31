import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './game.module.scss';
import Board from '../Board/Board';
import useFetch from '../../hooks/useFetch';
import Player from './Player/Player';

import { socket } from '../../socket';

const Game = () => {
  const pathname = useLocation().pathname.split('/');
  const id = pathname[pathname.length - 1];

  const [localColor, setLocalColor] = useState('');
  const [board, setBoard] = useState([]);
  const [players, setPlayers] = useState({});

  const {data, error, loading} = useFetch({
    url: `${process.env.REACT_APP_API_IP}/api/game/${id}`
  });

  const joinRoom = (roomId: string) => {
    socket.emit('join', { id: localStorage.userId, room: roomId });
  };

  useEffect(() => {
    if (data) {
      setPlayers(data.players);
      setBoard(data.board);

      for (const [key, value] of Object.entries(data.players)) {
        let player: any = value;
        if (player.id === localStorage.userId) {
          setLocalColor(key);
        }
      }
    }
    console.log(board, players, localColor);
  }, [data]);

  useEffect(() => {
    joinRoom(id);
  }, []);

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