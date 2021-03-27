import { FC, useState } from 'react';
import styled from 'styled';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, SubmitHandler } from 'react-hook-form';
import Joi from 'joi';
import { Helmet } from 'react-helmet';
import { SearchField, ItemCard, Spinner } from 'components';
import { httpService } from 'services';
import { Search } from 'icons';

export const Container = styled.div`
  h1 {
    margin: 50px 0;
  }
  h2 {
    text-align: center;
    font-size: 1.2rem;
    color: ${({ theme }): string => theme.primary};
    margin-top: 75px;
  }
`;

const schema = Joi.object({
  search: Joi.string()
});

const SearchContainer = styled.div`
  position: relative;
`;

const SearchIconContainer = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  background-color: white;
  border: none;
`;

const List = styled.div`
  margin-top: 75px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
`;

const SpinnerContainer = styled.div`
  margin-top: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: ${({ theme }) => theme.primary};
    stroke: ${({ theme }) => theme.primary};
  }
`;

interface IFormInputs {
  search: string;
}
export const Discover: FC = () => {
  const [items, setItems] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm<IFormInputs>({ mode: 'onSubmit', resolver: joiResolver(schema) });

  const onSubmit: SubmitHandler<IFormInputs> = async ({ search }) => {
    setLoading(true);
    try {
      const s = search.split(',');
      const queries = s.map((searchTerm) => {
        const keyval = searchTerm.split(':');
        return {
          match: { [keyval[0].trim()]: keyval[1].trim() }
        };
      });

      const response = await httpService.post('/query_movies', {
        query: {
          bool: {
            must: queries
          }
        }
      });
      if (response.ok) {
        const json = await response.json();
        setItems(json);
        setLoading(false);
      }
      return;
    }
    catch (e) {
      console.log(e);
    }
  };

  function handleKeyPress(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(onSubmit)();
    }
  }

  return (
    <Container>
      <Helmet>
        <title>Vatican | Discover</title>
      </Helmet>
      <h1>Discover</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchContainer>
          <SearchField error={errors.search} name="search" placeholder="Insert filter here 🧐" ref={register} />
          <SearchIconContainer onKeyPress={handleKeyPress} type="submit">
            <Search pointer />
          </SearchIconContainer>
        </SearchContainer>
      </form>

      {
        loading ?
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
          :
          !items ?
            <h2>Start filtering buddy ❤️</h2>
            :
            !items.length ?
              <h2>no items found.</h2>
              :
              <List>
                {items.map((item) => {
                  return <ItemCard id={item._source.id} imagePath={item._source.poster_path} key={item._id} title={item._source.title} />;
                })}
              </List>
      }
    </Container>
  );
};
