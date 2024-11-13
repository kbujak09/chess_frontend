import { useEffect, useState } from 'react';

import styles from './timer.module.scss';

type timerPropsType = {
  time: number,
  isActive: boolean,
  onTimeout: () => void,
}

const Timer = ({ time, isActive, onTimeout }: timerPropsType) => {
  const [seconds, setSeconds] = useState<number>(time);

  useEffect(() => {
    setSeconds(time);
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

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div className={styles.container}>
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;