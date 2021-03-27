import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TabSwitch } from 'components';
import styled from 'styled';
import { httpService } from 'services';

const Container = styled.div`
  box-shadow: ${({ theme }) => theme.shadow};
  background-color: white;
  border-radius: 1.5rem;
  padding: 20px 40px;
  min-height: 570px;
  display: ${({ loading }) => loading ? 'flex' : 'block'};
`;

const Tab = styled.div<{ label: string }>``;

const List = styled.ul`

  text-align: center;
  .title {
    width: 300px;
  }
  .releaseDate {
    width: 200px;
  }
  .genre {
    width: 150px;
  }
`;

const Header = styled.li`
  display: flex;
  width: 100%;
  margin-top: 20px;
  padding: 10px 15px;
  p{
    font-size: 120%;
    font-weight: 600;
    color: ${({ theme }): string => theme.secondary};
  }
`;

export const Top5: FC = () => {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState<any[]>([]);
  const [showData, setShowData] = useState<any[]>([]);

  async function getTop5Movies(){
    const response = await httpService.get('/query/top/movie?size=5');
    if (response.ok) {
      const json = await response.json();
      setMovieData(json);
    }
  }
  async function getTop5Shows() {
    const response = await httpService.get('/query/top/show?size=5');
    if (response.ok) {
      const json = await response.json();
      setShowData(json);
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getTop5Movies();
      getTop5Shows();
    }, 1500);
  }, []);

  if (loading) {
    return (
      <Container className="placeholder"/>
    );
  }

  return (
    <Container>
      <TabSwitch>
        <Tab label="Movies">
          <h2>Five most popular movies (VA)</h2>
          <List>
            <Header>
              <p className="title">Title</p>
              <p className="genre">Genre</p>
              <p className="releaseDate">Release date</p>
            </Header>
            {movieData.map((movie) => <Item genre="action" id={`${20}`} releaseDate="12/12/2021" title={movie._source.name} type="movie" />)}
          </List>
        </Tab>
        <Tab label="Shows">
          <h2>Five most popular series (VA)</h2>
          <List>
            <Header>
              <p className="title">Title</p>
              <p className="genre">Genre</p>
              <p className="releaseDate">Release date</p>
            </Header>
            {showData.map((show) => <Item genre="action" id="20" releaseDate="12/12/2021" title={show._source.name} type="show"/>)}
          </List>
        </Tab>
      </TabSwitch>
    </Container>
  );
};

const ItemContainer = styled.li`
   width: 100%;
  height: 60px;
  margin: 15px 0px;
  padding: 10px 15px;
  background-color:${({ theme }): string => theme.gray};
  border-radius: 1rem;
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  `;
interface ItemProps {
  releaseDate: string;
  title: string;
  type: 'movie' | 'show',
  id: string;
  genre: string;
}

const Item: FC<ItemProps> = ({ id, releaseDate, title, type, genre }) => {
  return (
    <ItemContainer>
      <Link to={`${type}/${id}`}>
        <p className="title">{title}</p>
        <p className="genre">{genre}</p>
        <p className="releaseDate">{releaseDate}</p>
      </Link>
    </ItemContainer>
  );
};
