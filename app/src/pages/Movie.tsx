import { FC, useState, useEffect } from 'react';
import styled from 'styled';
import { useParams } from 'react-router-dom';
import { httpService } from 'services';
import { Chip, Spinner } from 'components';

const Container = styled.div``;

const FlexContainer = styled.div`
  display: flex;
`;

const FlexItem = styled.div`
  padding: 0 8px 0 8px;
`;

const StyledList = styled.ul`
  list-style-type: circle;
  padding-left: 24px;
`;

const Image = styled.div<{ url: string }>`
  width: 300px;
  height: 450px;
  background-image: ${({ url }) => url ? `url(${url})` : null};
  background-size: cover;
  border-radius: 1.5rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19);
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const StyledSpinner = styled(Spinner)`
    fill: ${({ theme }) => theme.primary};
    stroke: ${({ theme }) => theme.primary};
`;

export const Movie: FC = () => {
  const { id } = useParams();
  const [m, setMovie] = useState<any>({});
  const [loading, setLoading] = useState(true);

  async function getMovie() {
    const response = await httpService.post('/query_movies', { query: { match: { id } } });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      setMovie(json[0]._source);
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovie();
  },[]);

  if (loading) {
    return (
      <Container>
        <StyledSpinner />;
      </Container>
    );
  }

  if (!m) {
    return <div>Movie not found</div>;
  }

  return (
    <FlexContainer>
      <FlexItem>
        <Image url={`https://www.themoviedb.org/t/p/w300${m.poster_path}`} />
      </FlexItem>
      <FlexItem>
        <Title>{m.title}</Title>
        <h4>{m.overview}</h4>
        <p>Releas date: {m.release_date}</p>
        <p>Revenue: {m.revenue}</p>
        <p>BUdget: {m.budget}</p>
        <p>Popularity: {m.popularity}</p>
        <p>Runtime: {m.runtime}</p>
        <p>User rated: {m.vote_average}</p>
        <p>Language: {m.spoken_languages[0].name}</p>
        <p>Actors:
          <StyledList>
            {m.trakt.people.cast.slice(0, 3).map((actor: any) => {
              return <Chip text={actor.person.name}></Chip>;
            })}
          </StyledList>
        </p>
        <p>Genre:
          <StyledList>
            {m.genres.map((genre: any) => {
              return <Chip text={genre.name}></Chip> ;
            })}
          </StyledList>
        </p>
        <p>Production companies:
          <StyledList>
            {m.production_companies.map((pc: any) => {
              return <Chip text={pc.name}></Chip> ;
            })}
          </StyledList>
        </p>

      </FlexItem>
    </FlexContainer>
  );
};
