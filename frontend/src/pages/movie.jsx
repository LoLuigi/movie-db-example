import React from 'react';
import { useLoaderData } from 'react-router-dom';
import {useContext } from 'react';
import UserContext from '../config/userContext';
import MovieAPI from '../apis/MovieAPI';
import ReviewAPI from '../apis/ReviewAPI';

import Page from '../components/Page';
import './styles/movie-styles.css'

import Popup from '../components/Popup';


export async function loader({ params }) {
  const movie = await MovieAPI.getMovie(params.movieId);
  const review = await ReviewAPI.getReview(params.movieId);
  return { movie, review };
}

const MoviePage = () => {
  const { movie } = useLoaderData();
  const {review} = useLoaderData();

  return (
    <Page title={`${movie.Title} (${movie.Year.substring(0, movie.Year.length - 2)})`}>
      <div className='wrapper1'>
        <Popup content={movie.Poster
        }></Popup>
        <div className='column2'>
          <p className='title'>Description:</p>
          <p>{movie.Description}</p>
          <li>Director: {movie.Director} </li>
          <li>Duration: {movie["Duration (min)"]} min</li>
          <li>Genre: {movie.Genre}</li>
          <li>Rating: {movie.Rating}</li>
          <li>Certificate: {movie.Certificate}</li>
        </div>
      </div>
      <div className='wrapper2'>
        <div className='review'> <p className='title'> Review: {review["Review Title"]} </p> <p className='reviewText'>{review.Review}</p></div>
      </div>
    </Page>
  );
};


export default MoviePage;
