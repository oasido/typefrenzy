import type { NextPage } from 'next';
import { PageLayout } from '../components/page-layout/page-layout';
import { Title } from '@mantine/core';
import { supabase } from '../utils/supabaseClient';

const Leaderboard: NextPage = () => {
  return (
    <PageLayout>
      <Title>Leaderboard</Title>
    </PageLayout>
  );
};

export default Leaderboard;

export const getServerSideProps = async () => {
  // get users score from db
  return {
    props: {
      // get list of users
    },
  };
};
