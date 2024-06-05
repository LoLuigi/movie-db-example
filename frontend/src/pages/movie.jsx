import React from 'react';
import { useLoaderData } from 'react-router-dom';

import MovieAPI from '../apis/MovieAPI';

import Page from '../components/Page';
import './movie-styles.css'

import Popup from '../components/Popup';
import List from '../components/List';


export async function loader({ params }) {
  const movies = await MovieAPI.getAllBatch(1, 100);
  const movie = movies.find((movie) => movie.Id === params.movieId);
  return { movie };
}

const MoviePage = () => {
  const { movie } = useLoaderData();
  console.log({ movie });
  return (
    <Page title={`${movie.Title} (${movie.Year.substring(0, movie.Year.length - 2)})`}>
      <div className='wrapper'>
        <Popup content={movie.Poster
        }></Popup>
        <div className='column2'>
          <p>{movie.Description}</p>
          <li>Duration: {movie["Duration (min)"]} min</li>
          <li>Genre: {movie.Genre}</li>
          <li>Rating: {movie.Rating}</li>
        </div>
      </div>
      <div className='wrapper'>
        {movie.Director}
      </div>
    </Page>
  );
};


export default MoviePage;
