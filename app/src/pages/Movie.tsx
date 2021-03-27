import { FC, useState, useEffect } from 'react';
import styled from 'styled';
import { useParams } from 'react-router-dom';
import { httpService } from 'services';
import { Chip, Spinner } from 'components';
import { Helmet } from 'react-helmet';

const Container = styled.div``;

export const FlexContainer = styled.div`
  display: flex;
`;
export const FlexItem = styled.div`
  padding: 0 8px 0 8px;

  &.details {
    width: 750px;
  }
  &.overview {
    margin-bottom: 25px;
  }

  h2 {
    margin-top: 25px;
  }

`;
export const StyledList = styled.ul`
  display: inline-flex;
  flex-direction: row;
  align-items: center;

  li {
    min-width: 50px;
  }
`;
export const Image = styled.div<{ url: string }>`
  width: 500px;
  height: 800px;
  background-image: ${({ url }) => url ? `url(${url})` : null};
  background-size: cover;
  border-radius: 1.5rem;
`;
const Part1 = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  p {
    margin: 0px 5px;
  }
`;
export const Title = styled.h1`
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledSpinner = styled(Spinner)`
    fill: ${({ theme }) => theme.primary};
    stroke: ${({ theme }) => theme.primary};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 150px 650px;
  grid-gap: 13px 0;
`;
const Description = styled.div`
  display: flex;
  align-items: center;
`;
const Value = styled.div`
  display: flex;
  align-items: center;
`;

export const Movie: FC = () => {
  const { id } = useParams();
  const [m, setMovie] = useState<any>({});
  const [loading, setLoading] = useState(true);

  async function getMovie() {
    const response = await httpService.post('/query_movies', { query: { match: { id } } });
    if (response.ok) {
      const json = await response.json();
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
    return <div>Movie not found. Make sure you used a correct query parameter.</div>;
  }
  return (
    <FlexContainer>
      <Helmet>
        <title>Vatican | Movie</title>
      </Helmet>
      <FlexItem>
        <Image url={`https://www.themoviedb.org/t/p/w780${m.poster_path}`} />
      </FlexItem>
      <FlexItem className="details">
        <Title>{m.title} <span> {m.vote_average} ⭐</span></Title>
        <Part1>
          <p> Release date: {!m.release_date ? 'unknown' : m.release_date} </p>
          <p> | Revenue: {!m.revenue ? 'unknown' : m.revenue}</p>
          <p> | Budget: {!m.budget ? 'unknown' : m.budget}</p>
          <p> | Runtime: {!m.runtime ? 'unknown' : m.runtime}</p>
        </Part1>

        <h2>Overview</h2>
        <p className="overview">{m.overview}</p>

        <h2>Details</h2>
        <Grid>
          <Description>Language</Description>
          <Value>{m.spoken_languages[0].name}</Value>

          <Description>Starring</Description>
          <Value>
            <StyledList>
              {m.trakt.people.cast.slice(0, 3).map((actor: any) => {
                return <li> {actor.person.name} </li>;
              })}
            </StyledList>
          </Value>

          <Description>Genre</Description>
          <Value>
            <StyledList>
              {m.genres.map((genre: any) => {
                return <Chip text={genre.name}></Chip> ;
              })}
            </StyledList>
          </Value>
        </Grid>

        <Description>Production companies:</Description>
        <Value>
          <StyledList>
            {m.production_companies.map((pc: any) => {
              return <li>{pc.name}</li>;
            })}
          </StyledList>
        </Value>
      </FlexItem>
    </FlexContainer>
  );
};
