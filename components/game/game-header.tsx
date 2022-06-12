import { Code, Container } from '@mantine/core';
import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import styles from '../../styles/game-header.module.css';
import { useGameStore } from '../../context/useGameStore';

export const GameHeader = () => {
  const { isStarted, setIsStarted, word, getWord, setInput } = useGameStore();

  const startGame = () => {};

  return (
    <Container size="xs" className={styles.container}>
      {isStarted ? (
        <h2 className={styles.word}>{word}</h2>
      ) : (
        <Text size="xl" className={styles.start}>
          Type <Code>start</Code> to begin!
        </Text>
      )}
    </Container>
  );
};
