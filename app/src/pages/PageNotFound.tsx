import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageNotFound: FC = () => {
  return (
    <Container>Page not found.</Container>
  );
};
