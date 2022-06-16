import { Container } from '@mantine/core';
import { GameCountdown } from './game-countdown';
import { GameStats } from './game-stats';
import { GameWord } from './game-word';
import { GameInput } from './game-input';
import { GameAnswers } from './game-answers';

export const GameLayout = (props: any) => {
  return (
    <Container size="xs">
      <GameCountdown />
      <GameStats />
      <GameWord />
      <GameInput />
      <GameAnswers />
    </Container>
  );
};
