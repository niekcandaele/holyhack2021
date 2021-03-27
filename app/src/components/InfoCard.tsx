import { FC } from 'react';
import styled from 'styled';

const Container = styled.div<{ active: boolean }>`
  background: ${({ active, theme }) => active ? theme.gradient : 'white'};
  height: 100px;
  border-radius: 1.5rem;
  padding: 10px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;

  h3 {
    font-size: 1.2rem;
    color: ${({ theme, active }): string => active ? 'white' : theme.primary};
  }
`;

const Amount = styled.p<{ active: boolean }>`
  font-size: 4rem;
  color: ${({ theme, active }): string => active ? 'white' : theme.primary};
  font-weight: 800;
`;

interface InfoCardProps {
  text: string;
  amount: number;
  isActive?: boolean;
}
export const InfoCard: FC<InfoCardProps> = ({ isActive = false, text, amount }) => {
  return (
    <Container active={isActive}>
      <Amount active={isActive}>{amount}</Amount>
      <h3>{text}</h3>
    </Container>
  );
};
