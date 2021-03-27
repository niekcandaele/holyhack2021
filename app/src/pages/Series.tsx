import { FC } from 'react';
import styled from 'styled';
import useFetch from 'use-http';
import { useParams } from 'react-router-dom';

export const Container = styled.div``;

interface Series {

}

export const Series: FC = () => {
  const { id } = useParams();
  const { loading, error, data = [] } = useFetch(`/movie/${id}`);

  if (loading) {
    return <div>'loading...'</div>;
  }

  if (error) {
    return <div>something went wrong..</div>;
  }

  return (
    <Container>
      {id}
    </Container>
  );
};
