import { PageHeader } from './page-header';
import { Container } from '@mantine/core';

export const PageLayout = (props: any) => {
  const LINKS = [
    { link: '/', label: 'Home' },
    { link: '/about', label: 'About' },
    { link: '/login', label: 'Login' },
  ];

  return (
    <>
      <PageHeader links={LINKS} />
      <Container>{props.children}</Container>
    </>
  );
};
