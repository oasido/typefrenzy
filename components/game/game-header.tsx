import { Code, Container } from '@mantine/core';
import { Text } from '@mantine/core';
import styles from '../../styles/game-header.module.css';
import { useGameStore } from '../../context/useGameStore';

export const GameHeader = () => {
  const { isStarted, word, input } = useGameStore();
  const wordArray: string[] = word.split('');

  return (
    <Container size="xs" className={styles.container}>
      {isStarted ? (
        <h2 className={styles.word}>
          {word.length > 0 &&
            wordArray.map((letter, idx) => {
              let color;
              if (letter === input[idx] && word[idx] <= input[idx]) {
                color = styles.correct;
              } else if (idx < input.length) {
                color = styles.incorrect;
              }

              return (
                <span key={idx} className={color}>
                  {letter}
                </span>
              );
            })}
        </h2>
      ) : (
        <Text size="xl" className={styles.start}>
          Type <Code>start</Code> to begin!
        </Text>
      )}
    </Container>
  );
};
