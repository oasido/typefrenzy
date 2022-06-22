import Countdown from 'react-countdown';
import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useGameStore } from '../../context/useGameStore';
import { IoMdStopwatch } from 'react-icons/io';
import styles from '../../styles/game-countdown.module.css';

export const GameCountdown = () => {
  const {
    isInGame,
    setIsInGame,
    word,
    setWord,
    input,
    gameStartDate,
    isGameEnded,
    setIsGameEnded,
  } = useGameStore();
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    if (input !== 'start' && isInGame === true) {
      setBonus((prev) => prev + 1000);
    }
  }, [word]);

  interface Irenderer {
    minutes: number;
    seconds: number;
    milliseconds: number;
  }
  const renderer = ({ seconds, milliseconds }: Irenderer) => (
    <Text>{`${seconds}.${milliseconds}s`}</Text>
  );

  const handleGameComplete = () => {
    setIsInGame(false);
    setIsGameEnded(true);
    setBonus(0);
    setWord('start');
  };

  return (
    <>
      {isInGame && !isGameEnded && (
        <div className={styles.countdown}>
          <IoMdStopwatch size={20} />
          <Countdown
            date={gameStartDate + 900000 + bonus}
            intervalDelay={0}
            precision={3}
            onComplete={handleGameComplete}
            renderer={renderer}
            className={styles.countdown}
          />
        </div>
      )}
    </>
  );
};
