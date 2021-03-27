import { FC } from 'react';
import styled from 'styled';
import { InfoCard, Top5 } from 'components';
import { getTOD } from 'helpers';

const Container = styled.div``;
const Hello = styled.h1`
  margin-top: 40px;
  font-size: 4rem;
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
  return (
    <Container>
      <Hello>{getTOD()} Elise! </Hello>
      <Grid>
        <InfoCard amount={34500} text="Movies" />
        <InfoCard amount={29033} isActive text="Most viewed" />
        <InfoCard amount={12344} text="Series" />
      </Grid>
      <Top5/>
    </Container>
  );
};
