import type { NextPage } from 'next';
import { PageLayout } from '../components/page-layout/page-layout';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Center, Container, Input, Title, Text, InputWrapper, Alert } from '@mantine/core';
import { FaUserAstronaut } from 'react-icons/fa';
import { MdOutlinePassword, MdOutlineAlternateEmail } from 'react-icons/md';
import { GrCircleAlert } from 'react-icons/gr';
import styles from '../styles/register.module.css';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import axios from 'axios';
import { useState } from 'react';

const schema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Username should have at least 2 letters' })
      .max(15, { message: 'Username cannot be more than 15 characters' }),
    password: z.string().min(6, { message: 'Password needs to be at least 6 characters' }),
    email: z.string().email(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const Register: NextPage = () => {
  const { data: session } = useSession();

  interface IRegisterError {
    success: null | true | false;
    message: null | string;
  }

  const [registerError, setRegisterError] = useState<IRegisterError>({
    success: null,
    message: null,
  });

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = async () => {
    form.validate();
    if (Object.entries(form.errors).length === 0) {
      try {
        const response = await axios.post('/api/register', form.values);
        setRegisterError({
          success: response.data.success,
          message: response.data.error,
        });
      } catch (error) {
        // do something
      }
    }
  };

  return (
    <PageLayout>
      <Container size="xl">
        <div className={styles.registerInputs}>
          <Title order={1}>Register</Title>

          <InputWrapper error={form.errors.username}>
            <Input
              icon={<FaUserAstronaut className={styles.inputIcon} />}
              placeholder="username"
              size="lg"
              {...form.getInputProps('username')}
            />
          </InputWrapper>

          <InputWrapper error={form.errors.email}>
            <Input
              icon={<MdOutlineAlternateEmail className={styles.inputIcon} />}
              placeholder="email"
              size="lg"
              type="email"
              {...form.getInputProps('email')}
            />
          </InputWrapper>

          <InputWrapper error={form.errors.password}>
            <Input
              icon={<MdOutlinePassword className={styles.inputIcon} />}
              placeholder="password"
              size="lg"
              type="password"
              {...form.getInputProps('password')}
            />
          </InputWrapper>

          <InputWrapper error={form.errors.confirmPassword}>
            <Input
              icon={<MdOutlinePassword className={styles.inputIcon} />}
              placeholder="password, again"
              size="lg"
              type="password"
              {...form.getInputProps('confirmPassword')}
            />
          </InputWrapper>

          <Button color="green" onClick={handleRegister}>
            Register
          </Button>

          {registerError.success === false && (
            <Alert icon={<GrCircleAlert size={16} />} color="red">
              {registerError.message}
            </Alert>
          )}
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
