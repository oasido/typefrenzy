import { useGameStore } from '../../context/useGameStore';
import styles from '../../styles/game-answers.module.css';

export const GameAnswers = () => {
  const { answers, setAnswers } = useGameStore();

  return <div className={styles.answers}>{answers.join(', ')}</div>;
};
