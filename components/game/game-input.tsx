import { Container } from '@mantine/core';
import styles from '../../styles/game-input.module.css';
import { useGameStore } from '../../context/useGameStore';
import { useEffect } from 'react';

export const GameInput = () => {
  const { word, getWord, input, setInput, isStarted, setIsStarted, setAnswers } = useGameStore();

  const handleInput = () => {
    if (isStarted === false) {
      if (input === 'start') {
        getWord();
        setInput('');
        setIsStarted(true);
      }
    } else if (isStarted === true) {
      if (word === input) {
        getWord();
        setInput('');
        setAnswers(input);
      }
    }
  };

  useEffect(() => {
    handleInput();
  }, [input]);

  return (
    <Container size="xs">
      <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} />
    </Container>
  );
};
