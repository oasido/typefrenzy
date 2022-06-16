import { Code } from '@mantine/core';
import { Text } from '@mantine/core';
import styles from '../../styles/game-word.module.css';
import { useGameStore } from '../../context/useGameStore';

export const GameWord = () => {
  const { isInGame, word, input, isGameEnded } = useGameStore();
  const wordArray: string[] = word.split('');

  return (
    <>
      {isInGame === false && (
        <Text size="xl" className={styles.start}>
          Type <Code>start</Code> to begin!
        </Text>
      )}

      {isInGame === true && isGameEnded === false && (
        <div className={styles.container}>
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
        </div>
      )}
    </>
  );
};
