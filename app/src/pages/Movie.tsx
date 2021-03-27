import { FC, useEffect } from 'react';
import styled from 'styled';
import useFetch from 'use-http';
import { useParams } from 'react-router-dom';

export const Container = styled.div``;

interface Movie {

}

export const Movie: FC = () => {
  const { id } = useParams();
  const { loading, error, data = [] } = useFetch(`/movie/${id}`);

  if (loading) {
    return <div>'loading...'</div>;
  }

  return (
    <Container>
      Movie
    </Container>
  );
};
