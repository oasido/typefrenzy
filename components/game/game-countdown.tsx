import Countdown from 'react-countdown';
import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useGameStore } from '../../context/useGameStore';
import { IoMdStopwatch } from 'react-icons/io';
import styles from '../../styles/game-countdown.module.css';
import { useSession } from 'next-auth/react';
import { supabase } from '../../utils/supabaseClient';

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
    points,
    answers,
  } = useGameStore();
  const [bonus, setBonus] = useState<number>(0);
  const session = useSession();

  useEffect(() => {
    if (input !== 'start' && isInGame === true) {
      setBonus((prev) => prev + 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  interface Irenderer {
    minutes: number;
    seconds: number;
    milliseconds: number;
  }
  const renderer = ({ seconds, milliseconds }: Irenderer) => (
    <Text>{`${seconds}.${milliseconds}s`}</Text>
  );

  interface Game {
    id: number;
    user: number;
    points: number;
    word_count: number;
  }

  const saveGameInDB = async () => {
    const { error } = await supabase.from('games').insert({
      user: session?.data?.uid,
      points,
      word_count: answers.length,
    });

    if (error) {
      console.error(error);
      // TODO: add useState for error
    }
  };

  const handleGameComplete = () => {
    session.status === 'authenticated' && saveGameInDB();
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
            date={gameStartDate + 9000 + bonus}
            intervalDelay={0}
            precision={3}
            onComplete={handleGameComplete}
            renderer={renderer}
            className={styles.countdown}
          />
        </div>
      )}
      {!isInGame && (
        <div className={styles.countdown}>
          <IoMdStopwatch size={20} />
          {isGameEnded ? <Text>0:0.0s</Text> : <Text>10:0.0s</Text>}
        </div>
      )}
    </>
  );
};
