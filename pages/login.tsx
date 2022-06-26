import type { NextPage } from 'next';
import { PageLayout } from '../components/page-layout/page-layout';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Center, Container, Input, Title, Text } from '@mantine/core';
import { FaUserAstronaut } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { RiFacebookCircleLine, RiGithubLine } from 'react-icons/ri';
import styles from '../styles/login.module.css';

const Login: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <PageLayout>
      <Container size="xl">
        <div className={styles.loginInputs}>
          <Title order={1}>Login</Title>
          <Input
            icon={<FaUserAstronaut className={styles.inputIcon} />}
            placeholder="username"
            size="lg"
          />
          <Input
            icon={<MdOutlinePassword className={styles.inputIcon} />}
            placeholder="password"
            size="lg"
            type="password"
          />
          <Text>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{' '}
            <Link href="/register">
              <span className={styles.href}>Register</span>
            </Link>
          </Text>
        </div>
        <div className={styles.otherLogins}>
          <Button
            onClick={() => signIn('facebook')}
            leftIcon={<RiFacebookCircleLine className={styles.inputIcon} />}
            className={styles.otherLoginButton}
          >
            Login with Facebook
          </Button>
          <Button
            onClick={() => signIn('github')}
            leftIcon={<RiGithubLine className={styles.inputIcon} />}
            className={styles.otherLoginButton}
            color="gray"
          >
            Login with GitHub
          </Button>
        </div>
      </Container>
    </PageLayout>
  );
};

export default Login;
