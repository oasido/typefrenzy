import { GameHeader } from './game-header';
import { GameInput } from './game-input';
import { GameAnswers } from './game-answers';

export const GameLayout = (props: any) => {
  return (
    <div>
      <GameHeader />
      <GameInput />
      <GameAnswers />
    </div>
  );
};
