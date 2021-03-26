import { FC } from 'react';
import styled from 'styled';
import { Avatar } from './Avatar';

const Container = styled.div`
  width: 100%;
  height: 75px;
  background-color: white;
  padding: 10px 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: ${({ theme }): string => theme.shadow};
`;

const Name = styled.h4`
  display: flex;
  flex-direction: column;
  span {
    color: ${({ theme }): string => theme.gray};
    font-size: 1rem;
  }
  p{
    font-weight: 800;
  }
  margin-right: 15px;
`;

export const Header: FC = () => {
  return (
    <Container>
      <Name><span>Welcome</span><p>Elise</p></Name><Avatar size="small" src="https://image.shutterstock.com/image-photo/pretty-smiling-joyfully-female-fair-260nw-776697943.jpg" />
    </Container>
  );
};
