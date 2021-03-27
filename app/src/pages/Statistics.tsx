import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`
  h1 {
    margin: 50px 0;
  }
`;

export const Statistics: FC = () => {
  return (
    <Container><h1>Statistics</h1></Container>
  );
};
