import type { NextPage } from 'next';
import { PageLayout } from '../components/page-layout/page-layout';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Center, Container, Input, Title, Text } from '@mantine/core';
import { FaUserAstronaut } from 'react-icons/fa';
import { MdOutlinePassword } from 'react-icons/md';
import { RiFacebookCircleLine, RiGithubLine } from 'react-icons/ri';
import styles from '../styles/register.module.css';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';

const schema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username should have at least 2 letters' })
    .max(15, { message: 'Username cannot be more than 15 characters' }),
  password: z.string().min(6, { message: 'Password needs to be at least 6 characters' }),
});

const Register: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  const form = useForm({
    schema: zodResolver(schema),
  });

  const handleRegister = () => {};

  return (
    <PageLayout>
      <Container size="xl">
        <div className={styles.registerInputs}>
          <Title order={1}>Register</Title>
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
          <Input
            icon={<MdOutlinePassword className={styles.inputIcon} />}
            placeholder="password, again"
            size="lg"
            type="password"
          />
          <Button color="green" onClick={handleRegister}>
            Register
          </Button>
          <Text>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Already have an account?{' '}
            <Link href="/login">
              <span className={styles.href}>Login</span>
            </Link>
          </Text>
        </div>
      </Container>
    </PageLayout>
  );
};

export default Register;
