import { Container } from '@mantine/core';
import { useGameStore } from '../../context/useGameStore';
import styles from '../../styles/game-answers.module.css';

export const GameAnswers = () => {
  const { answers, setAnswers } = useGameStore();

  return (
    <Container size="xs" className={styles.container}>
      <div className={styles.answers}>{answers.join(', ')}</div>
    </Container>
  );
};
