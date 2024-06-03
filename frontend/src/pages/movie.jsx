import React from 'react';
import { useLoaderData } from 'react-router-dom';

import MovieAPI from '../apis/MovieAPI';

import Page from '../components/Page';
import './movie-styles.css'


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
        <div className='column1'>
          <img className='Moviepicture' src={movie.Poster} alt="Movie Poster"></img>
        </div>
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
