import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TabSwitch } from 'components';
import styled from 'styled';
import { httpService } from 'services';
import { Chip } from './Chip';

const Container = styled.div<{ loading?: boolean }>`
  box-shadow: ${({ theme }) => theme.shadow};
  background-color: white;
  border-radius: 1.5rem;
  padding: 20px 40px;
  min-height: 570px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
  }
  .productionHouse, .rating {
    width: 250px;
  }
  .rating{
    width: 200px;
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
      console.log(json);
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
              <p className="releaseDate">Release date</p>
              <p className="genre">Genre</p>
              <p className="productionHouse">Production house</p>
              <p className="rating">Rating</p>
            </Header>
            {movieData.map((movie) => (
              <Item
                genre={movie._source.genres}
                id={movie._id.split('_')[0]}
                productionHouse={movie._source.production_companies[0].name}
                rating={movie._source.vote_average}
                releaseDate={movie._source.release_date}
                title={movie._source.name}
                type="movie"
              />
            ))}
          </List>
        </Tab>
        <Tab label="Shows">
          <h2>Five most popular series (VA)</h2>
          <List>
            <Header>
              <p className="title">Title</p>
              <p className="releaseDate">Release date</p>
              <p className="genre">Genre</p>
              <p className="productionHouse">Production house</p>
              <p className="rating">rating</p>
            </Header>
            {showData.map((show) =>
              (
                <Item
                  genre={show._source.genres}
                  id={show._id.split('_')[0]}
                  productionHouse={show._source.production_companies[0].name}
                  rating={show._source.name}
                  releaseDate={show._source.first_air_date}
                  title={show._source.name}
                  type="show"
                />
              ))}
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
  genre: [any];
  rating: number;
  productionHouse: string;
}

const Item: FC<ItemProps> = ({ id, releaseDate, title, type, genre, rating, productionHouse }) => {
  return (
    <ItemContainer>
      <Link to={`/${type}/${id}`}>
        <p className="title">{title}</p>
        <p className="releaseDate">{releaseDate}</p>
        <p className="genre"><Chip text={genre[0].name}/></p>
        <p className="productionHouse">{productionHouse}</p>
        <p className="rating">{rating}</p>
      </Link>
    </ItemContainer>
  );
};
