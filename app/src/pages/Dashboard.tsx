import { FC } from 'react';
import styled from 'styled';
import { Chip, InfoCard } from 'components';
import { getTOD } from 'helpers';

const Container = styled.div``;
const Hello = styled.h1`
  margin-top: 50px;
  font-size: 5rem;
  color: ${({ theme }): string => theme.secondary};
  opacity: .3;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 75px;
`;

export const Dashboard: FC = () => {
  // TODO: get basic metrics

  function handleDelete() { }

  return (
    <Container>
      <Hello>{getTOD()} Elise! </Hello>
      <Grid>
        <InfoCard amount={34500} text="Movies" />
        <InfoCard amount={29033} isActive text="Most viewed" />
        <InfoCard amount={12344} text="Series" />
      </Grid>
      <Chip onDelete={handleDelete} text="Adventure" />
    </Container>
  );
};
