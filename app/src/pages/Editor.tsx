import { FC } from 'react';
import styled from 'styled';

export const Container = styled.div`
  h1 {
    margin: 50px 0 0 0;
  }
`;

export const Editor: FC = () => {
  return (
    <Container>
      <h1>Editor</h1>
      <p>
        Search a serie or movie using the id and manually edit its content.
        This content will be automatically available on your next search.
      </p>
    </Container>
  );
};
