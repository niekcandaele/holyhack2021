import { FC, useState, useEffect } from 'react';
import styled from 'styled';
import { useParams } from 'react-router-dom';
import { httpService } from 'services';
import { Spinner } from 'components';

const Container = styled.div``;

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
  const [m, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getMovie() {
    const response = await httpService.post('query_movies', { query: { match: { id } } });
    if (response.ok) {
      const json = await response.json();
      setMovie(json);
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
    <Container>
      <Image url={'https://www.themoviedb.org/t/p/w300/'} />
      <Title>title</Title>
    </Container>
  );
};
