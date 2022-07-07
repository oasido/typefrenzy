import type { NextPage } from 'next';
import { PageLayout } from '../components/page-layout/page-layout';
import { Title, Table } from '@mantine/core';
import { supabase } from '../utils/supabaseClient';
import styles from '../styles/leaderboard.module.css';
import Image from 'next/image';
import { createAvatar } from '@dicebear/avatars';
import * as avatarStyle from '@dicebear/adventurer-neutral';

type Data = {
  data: any;
};

const getAvatar = (email) => {
  const svg = createAvatar(avatarStyle, {
    seed: email || '',
  });
  return svg;
};

const Leaderboard: NextPage = ({ data }) => {
  const rows = data.map((element, index) => {
    const { id, word_count, points } = element;
    const { avatar, email, username } = element.users;

    return (
      <tr key={id}>
        <td>{index + 1}</td>
        <td className={styles.avatar}>
          {avatar ? (
            <Image src={avatar} width="35" height="35" alt={`avatar-${username}`} />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: `<div className=${styles.avatar}>${getAvatar(email)}</div>`,
              }}
            />
          )}
        </td>
        <td>{username}</td>
        <td>{word_count}</td>
        <td>{points}</td>
      </tr>
    );
  });

  return (
    <PageLayout>
      <Title>Leaderboard</Title>
      <h4>Here you can find the top 10 games with the highest points score</h4>
      <Table verticalSpacing="xs" highlightOnHover>
        <thead>
          <tr>
            <th>#</th>
            <th style={{ maxWidth: 50 }}></th>
            <th>Username</th>
            <th>Word Count</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </PageLayout>
  );
};

export default Leaderboard;

export const getServerSideProps = async () => {
  // get users score from db
  const { data, error } = await supabase
    .from('games')
    .select(
      `id, created_at, points, word_count, users (
      email, username, avatar
    )`
    )
    .order('points', { ascending: false })
    .limit(10);

  if (data) {
    return {
      props: {
        data,
      },
    };
  }

  if (error) {
    return {
      props: {
        data: null,
      },
    };
  }
};
