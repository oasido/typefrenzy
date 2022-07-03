import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

export function PageHeader() {
  const session = useSession();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { pathname } = useRouter();

  const { classes, cx } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
      <Container className={classes.header}>
        <Title order={2}>TypeFrenzy ⌨️</Title>
        <Group spacing={5} className={classes.links}>
          <Link href="/">
            <a className={`${classes.link} ${pathname === '/' && classes.linkActive}`}>Home</a>
          </Link>
          <Link href="/about">
            <a className={`${classes.link} ${pathname === '/about' && classes.linkActive}`}>
              About
            </a>
          </Link>
          {session.status === 'unauthenticated' && (
            <Link href="/login">
              <a className={`${classes.link} ${pathname === '/login' && classes.linkActive}`}>
                Login
              </a>
            </Link>
          )}
          {session.status === 'authenticated' && (
            <a className={classes.link} onClick={() => signOut()}>
              Logout
            </a>
          )}
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <Link href="/">
                <a className={classes.link}>Home</a>
              </Link>
              <Link href="/about">
                <a className={classes.link}>About</a>
              </Link>
              {session.status === 'unauthenticated' && (
                <Link href="/login">
                  <a className={classes.link}>Login</a>
                </Link>
              )}
              {session.status === 'authenticated' && (
                <Link href="/login">
                  <a className={classes.link}>Login</a>
                </Link>
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
