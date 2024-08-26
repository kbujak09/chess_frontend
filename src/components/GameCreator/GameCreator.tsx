import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import styles from './gamecreator.module.scss';
import { UserContext } from '../../context/context';


type gameCreatorPropsType = {
  minutes: number,
  increment?: number,
}

const GameCreator = ({minutes, increment}: gameCreatorPropsType) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const colors = ['white', 'black'];

  const getType = (): string => {
    if (minutes < 3) {
      return 'bullet';
    }
    else if (minutes < 10) {
      return 'blitz';
    }   
    return 'rapid';
  }

  const getColor = (): string => {
    const randomNumber = Math.floor(Math.random() * colors.length);
    return colors[randomNumber];
  }

  const handleClick = async () => {
    const gameId = uuidv4();
    const req = await fetch(`${process.env.REACT_APP_API_IP}/api/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerId: user.id,
        playerUsername: user.username,
        gameId: gameId
      })
    });
    if (req.ok) {
      return navigate(`/game/${gameId}`);
    }

    return;
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.time}>
        <span className={styles.minutes}>
          {minutes}
        </span>
          +
        <span className={styles.increment}>
          {increment ? increment : 0}
        </span>
      </div>
      <div className={styles.type}>
        {getType()}
      </div>
    </div>
  )
};

export default GameCreator;