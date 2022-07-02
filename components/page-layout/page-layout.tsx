import { PageHeader } from './page-header';
import { Container } from '@mantine/core';

export const PageLayout = (props: any) => {
  return (
    <>
      <PageHeader />
      <Container>{props.children}</Container>
    </>
  );
};
