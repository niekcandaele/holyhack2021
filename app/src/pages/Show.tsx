import React, { FC, useEffect, useState } from 'react';
import styled from 'styled';
import useFetch from 'use-http';
import { useParams } from 'react-router-dom';
import { FlexContainer, FlexItem, StyledList, Title, Image } from './Movie';
import { Chip } from 'components';

export const Container = styled.div``;

export const Show: FC = () => {
  const { id } = useParams();
  const { error, post, response } = useFetch(process.env.REACT_APP_API);
  const [show, setShow] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  async function getShow() {
    await post('/query_movies', { query: { match: { id: id } } });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      setShow(json[0]._source);
      setLoading(false);
    }
  }

  useEffect(() => {getShow();}, []);

  if (loading) {
    return <div>'loading...'</div>;
  }

  if (error) {
    return <div>something went wrong..</div>;
  }

  return (
    <FlexContainer>
      <FlexItem>
        <Image url={`https://www.themoviedb.org/t/p/w300${show.poster_path}`} />
      </FlexItem>
      <FlexItem>
        <Title>{show.title}</Title>
        <h4>{show.overview}</h4>
        <p>Releas date: {show.first_air_date}</p>
        <p>No. episodes: {show.number_of_episodes}</p>
        <p>No. seasons: {show.number_of_seasons}</p>
        <p>Popularity: {show.popularity}</p>
        <p>User rated: {show.vote_average}</p>
        <p>Language: {show.spoken_languages[0].name}</p>
        <p>Actors:
          <StyledList>
            {show.trakt.people.cast.slice(0, 3).map((actor: any) => {
              return <Chip text={actor.person.name}></Chip>;
            })}
          </StyledList>
        </p>
        <p>Genre:
          <StyledList>
            {show.genres.map((genre: any) => {
              return <Chip text={genre.name}></Chip> ;
            })}
          </StyledList>
        </p>
        <p>Production companies:
          <StyledList>
            {show.production_companies.map((pc: any) => {
              return <Chip text={pc.name}></Chip> ;
            })}
          </StyledList>
        </p>

      </FlexItem>
    </FlexContainer>
  );
};
