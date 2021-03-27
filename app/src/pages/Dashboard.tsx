import { FC, useEffect, useState } from 'react';
import styled from 'styled';
import { Helmet } from 'react-helmet';
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
  const [totalRunTime, setTotalRunTime] = useState<number>(0);

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
    }
  }

  async function getTotalRuntime() {
    const response = await httpService.get('/total-runtime');
    if (response.ok) {
      const amount = await response.json();
      setTotalRunTime(amount.totalRuntime);
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getMovieCount();
      getShowCount();
      getTotalRuntime();
    }, 1500);
  },[]);

  return (
    <>
      <Helmet>
        <title>Vatican | Dashboard</title>
      </Helmet>
      <Container>
        <Hello>{getTOD()} Elise! </Hello>
        <Grid>
          <InfoCard amount={movieCount} loading={loading} text="Movies" />
          <InfoCard amount={totalRunTime} isActive loading={loading}text="Minutes of playtime" />
          <InfoCard amount={showCount} loading={loading} text="Shows" />
        </Grid>
        <Top5/>
      </Container>
    </>
  );
};
