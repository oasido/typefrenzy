import styles from '../../styles/game-stats.module.css';
import { useGameStore } from '../../context/useGameStore';

export const GameStats = () => {
  const { word, isInGame } = useGameStore();

  return (
    <div className={styles.stats}>
      <div className={styles.stat}>points</div>
      <div className={styles.stat}>words completed</div>
    </div>
  );
};
