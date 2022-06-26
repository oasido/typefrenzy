import type { NextPage } from 'next';
import { GameLayout } from '../components/game/game-layout';
import { PageLayout } from '../components/page-layout/page-layout';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@mantine/core';

const Home: NextPage = () => {
  return (
    <PageLayout>
      <GameLayout />
    </PageLayout>
  );
};

export default Home;
