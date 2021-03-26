import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`

`;

interface CardProps {
  size: 'small' | 'medium' | 'large'
}

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};
