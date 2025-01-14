import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { formatTime } from '../../../utils/utils';

import styles from './timer.module.scss';

type timerPropsType = {
  time: number,
  isActive: boolean,
  onTimeout: () => void,
  setIsOver: Dispatch<SetStateAction<boolean>>
}

const Timer = ({ time, isActive, onTimeout, setIsOver }: timerPropsType) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (time < 1) {
      setIsOver(true);
    }
    if (time > 0) {
      setSeconds(time);
    }
    else {
      setSeconds(0);
    }
  }, [time]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(interval);
            onTimeout();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, onTimeout ]);

  return (
    <div className={styles.container}>
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;