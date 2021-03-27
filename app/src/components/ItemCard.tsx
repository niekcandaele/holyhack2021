import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled';

const Container = styled.div`
  transition: all .2s ease-in-out;
  &:hover {
    transform: translateY(-3px);
  }
  h3 {
    margin-top: 10px;
    font-size: 1rem;
  }
`;

const Image = styled.div<{ url: string }>`
  width: 150px;
  height: 250px;
  border-radius: 1rem;
  background-image: ${({ url }): string => `url(${url})`};
  background-size: cover;
`;

interface MovieCardProps {
  id: number;
  title: string;
  imagePath: string;
}

export const ItemCard: FC<MovieCardProps> = ({ id, title, imagePath }) => {
  return (
    <Container>
      <Link to={`/movie/${id}`}>
        <Image url={`https://www.themoviedb.org/t/p/w300/${imagePath}`}/>
      </Link>
      <h3>{title}</h3>
    </Container>
  );
};
