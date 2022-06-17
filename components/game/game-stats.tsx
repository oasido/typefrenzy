import styles from '../../styles/game-stats.module.css';
import { useGameStore } from '../../context/useGameStore';
import { useEffect, useState } from 'react';

export const GameStats = () => {
  const { answers } = useGameStore();
  const [points, setPoints] = useState<number>(0);

  const handlePoints = (): void => {
    const wordLength = answers[answers.length - 1].length;

    switch (true) {
      case wordLength < 4: // less than 4 letters
        setPoints(points + 1);
        break;
      case wordLength === 4: // 4 letters
        setPoints(points + 2);
        break;
      case wordLength === 5: // 5 letters
        setPoints(points + 3);
        break;
      case wordLength > 5: // more than 6 letters
        setPoints(points + 4);
        break;
    }
  };

  useEffect(() => {
    answers.length > 0 && handlePoints();
  }, [answers]);

  return (
    <div className={styles.stats}>
      <div className={styles.stat}>{points} points</div>
      <div className={styles.stat}>{answers.length} word count</div>
    </div>
  );
};
