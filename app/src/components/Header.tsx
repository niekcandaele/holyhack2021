import { FC } from 'react';
import styled from 'styled';
import { Avatar } from './Avatar';
import { Bell } from 'icons';

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

const IconContainer = styled.div`
  margin-left: 5px;
  margin-right: 15px;
  padding: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient};
  cursor: pointer;
`;

export const Header: FC = () => {
  return (
    <Container>
      <IconContainer>
        <Bell fill="white" pointer />
      </IconContainer>
      <Name><span>Welcome</span><p>Elise</p></Name>
      <Avatar size="small" src="https://image.shutterstock.com/image-photo/pretty-smiling-joyfully-female-fair-260nw-776697943.jpg" />
    </Container>
  );
};
