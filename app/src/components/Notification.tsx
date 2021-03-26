import { FC, ReactNode } from 'react';
import styled from 'styled';
import { Button } from 'components';

const Container = styled.div`
  width: 100%;
  height: 150px;
  box-shadow: ${({ theme }): string => theme.shadow};
  background-color: white;
  margin-bottom: 50px;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
`;
const IconContainer = styled.div`
  width: 20%;
`;

const TextContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

interface NotificationProps {
  title: string;
  description: string;
  icon: ReactNode
}

export const Notification: FC<NotificationProps> = ({ icon, title, description }) => {
  return (
    <Container>
      <IconContainer>
        {icon}
      </IconContainer>
      <TextContainer>
        <h3>{title}</h3>
        <p>{description}</p>
      </TextContainer>
      <Button label="I understand" size="medium" />
    </Container>
  );
};
