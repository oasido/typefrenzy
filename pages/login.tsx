import type { NextPage } from 'next';
import { PageLayout } from '../components/page-layout/page-layout';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { Button, Container, Input, Title, Text, Alert } from '@mantine/core';
import { FaUserAstronaut } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { RiFacebookCircleLine, RiGithubLine } from 'react-icons/ri';
import { FiAlertCircle } from 'react-icons/fi';
import styles from '../styles/login.module.css';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import Router from 'next/router';

const Login: NextPage = () => {
  const session = useSession();

  type Error = {
    show: boolean;
    message: string | null;
  };

  const [error, setError] = useState<Error>({
    show: false,
    message: null,
  });

  useEffect(() => {
    session.status === 'authenticated' && Router.push('/');
  }, [session.status]);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin = async () => {
    const response = await signIn('credentials', {
      redirect: false,
      username: form.values.username,
      password: form.values.password,
    });

    response?.error ? setError({ show: true, message: 'Wrong username or password.' }) : null;
  };

  return (
    <PageLayout>
      <Container size="xl">
        <div className={styles.loginInputs}>
          <Title order={1}>Login</Title>
          <Input
            icon={<FaUserAstronaut className={styles.inputIcon} />}
            placeholder="username"
            size="lg"
            name="username"
            {...form.getInputProps('username')}
          />
          <Input
            icon={<MdOutlinePassword className={styles.inputIcon} />}
            placeholder="password"
            size="lg"
            type="password"
            name="password"
            {...form.getInputProps('password')}
          />
          <Button color="green" onClick={handleLogin}>
            Login
          </Button>
          <Text>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{' '}
            <Link href="/register" passHref>
              <a className={styles.href}>Register</a>
            </Link>
          </Text>

          {error?.show && (
            <Alert
              icon={<FiAlertCircle size={16} />}
              title="Login failed"
              color="red"
              withCloseButton
              onClose={() =>
                setError((err) => {
                  return {
                    ...err,
                    show: false,
                  };
                })
              }
            >
              {error.message}
            </Alert>
          )}
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
