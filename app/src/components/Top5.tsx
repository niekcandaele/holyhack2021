import { FC, useState, useEffect } from 'react';
import { TabSwitch, Spinner } from 'components';
import styled from 'styled';
import { httpService } from 'services';

const Container = styled.div<{loading: boolean}>`
  box-shadow: ${({ theme }) => theme.shadow};
  background-color: white;
  border-radius: 1.5rem;
  padding: 20px 40px;
  min-height: 350px;
  display: ${({ loading }) => loading ? 'flex' : 'block'};
`;

const Tab = styled.div<{ label: string }>``;

const List = styled.ul``;
const Item = styled.li``;

const StyledSpinner = styled(Spinner)`
  stroke: ${({ theme }): string => theme.primary};
  fill: ${({ theme }): string => theme.primary};
`;

export const Top5: FC = () => {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState<any[]>();
  const [seriesData, setSeriesData] = useState<any[]>();

  async function getTop5Movies(){
    const response = await httpService.get('query_movies');
    if (response.ok) {
      const json = await response.json();
      setMovieData(json);
      setLoading(false);
    }
  }
  async function getTop5Series() {
    const response = await httpService.get('query_movies');
    if (response.ok) {
      const json = await response.json();
      setSeriesData(json);
    }
  }

  useEffect(() => {
    getTop5Movies();
    getTop5Series();
  }, []);

  if (loading) {
    return (
      <Container loading={true}>
        <StyledSpinner />
      </Container>
    );
  }

  return (
    <Container loading={false}>
      <TabSwitch>
        <Tab label="Movies">
          <h2>Five most popular movies (VA)</h2>
          <List></List>
        </Tab>
        <Tab label="Series">
          <h2>Five most popular series (VA)</h2>
          <List>
            { }
          </List>
        </Tab>
      </TabSwitch>
    </Container>
  );
};
