import { FC } from 'react';
import styled from 'styled';

const Container = styled.div`
  width: fit-content;
  padding: 3px;
`;

interface ChipProps {
  text: string;
  onDelete: () => void;
}

export const Chip: FC<ChipProps> = () => {
  return (
    <Container>content here</Container>
  );
};
