import { FC } from 'react';
import styled from 'styled';
import { Plus } from 'icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  padding: 3px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 1.5rem;
  padding: 3px 10px 3px 15px;
  font-weight: 700;
  span {
    font-size: 1.2rem;
    margin-right: 5px;
  }

`;

const Delete = styled.div`
  cursor: pointer;
  svg {
    fill: white;
    transform: rotate("90deg")
  }
`;

const Cross = styled(Plus)`
  transform: rotate(45deg) scale(.8);
`;

interface ChipProps {
  text: string;
  onDelete: () => void;
}

export const Chip: FC<ChipProps> = ({ text, onDelete }) => {
  return (
    <Container>
      <span>{text}</span>
      { typeof onDelete === 'function' ? <Delete><Cross pointer /></Delete> : ''}
    </Container>
  );
};
