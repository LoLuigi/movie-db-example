import React from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

import MovieAPI from '../apis/MovieAPI';

import Page from '../components/Page';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Mycomp from '../components/Mycomp';

export async function loader() {
  const movies = await MovieAPI.getAllBatch(1, 100);
  return { movies };
}

const MoviesPage = () => {
  const { movies } = useLoaderData();
  console.log({ movies });
  return (
    <Page title="Movies">
      <List>
        {
          movies.map((movie) => (
            <Mycomp key={`movie-list-item-${movie.Id}`}>
              <Link to={`movies/${movie.Id}`}>
                {movie.Title} - {movie.Director}
              </Link>
            </Mycomp>
          ))
        }
      </List>
    </Page>
  );
};

export default MoviesPage;
