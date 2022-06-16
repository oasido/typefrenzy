import { Input } from '@mantine/core';
import styles from '../../styles/game-input.module.css';
import { useGameStore } from '../../context/useGameStore';
import { useEffect } from 'react';

export const GameInput = () => {
  const { word, getWord, input, setInput, isInGame, setIsInGame, setAnswers, setGameStartDate } =
    useGameStore();

  const handleInput = () => {
    if (isInGame === false) {
      if (input === 'start') {
        getWord();
        setInput('');
        setIsInGame(true);
        setGameStartDate(Date.now());
      }
    } else if (isInGame === true) {
      if (word === input) {
        getWord();
        setInput('');
        setAnswers(input);
      }
    }
  };

  useEffect(() => {
    handleInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <Input
      value={input}
      placeholder={word}
      size="xl"
      className={styles.input}
      onChange={(e: any) => setInput(e.target.value)}
    />
  );
};
