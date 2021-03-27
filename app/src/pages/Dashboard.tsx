import { FC, useEffect, useState } from 'react';
import styled from 'styled';
import { InfoCard, Top5 } from 'components';
import { getTOD } from 'helpers';
import { httpService } from 'services';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [movieCount, setMovieCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);

  async function getMovieCount() {
    const response = await httpService.get('/query/count/movie');
    if (response.ok) {
      const amount = await response.json();
      setMovieCount(amount);
    }
  }
  async function getShowCount() {
    const response = await httpService.get('/query/count/show');
    if (response.ok) {
      const amount = await response.json();
      setShowCount(amount);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovieCount();
    getShowCount();
  },[]);

  return (
    <Container>
      <Hello>{getTOD()} Elise! </Hello>
      <Grid>
        <InfoCard amount={movieCount} loading={loading} text="Movies" />
        <InfoCard amount={29033} isActive loading={loading}text="Most viewed" />
        <InfoCard amount={showCount} loading={loading} text="Shows" />
      </Grid>
      <Top5/>
    </Container>
  );
};
