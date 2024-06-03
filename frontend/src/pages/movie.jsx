import React from 'react';
import { useLoaderData } from 'react-router-dom';

import MovieAPI from '../apis/MovieAPI';

import Page from '../components/Page';

export async function loader({ params }) {
  const movies = await MovieAPI.getAllBatch(1, 100);
  const movie = movies.find((movie) => movie.Id === params.movieId);
  return { movie };
}

const MoviePage = () => {
  const { movie } = useLoaderData();
  console.log({ movie });
  return (
    <Page title="Movie">
      MoviePage
    </Page>
  );
};


export default MoviePage;
