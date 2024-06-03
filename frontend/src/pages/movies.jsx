import React from 'react';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { useState } from "react";

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
  const [hidden, setHidden] = useState(true);
  console.log({ movies });
  return (
    <Page title="Movies">
      <List>
        {
          movies.map((movie) => (
            <Mycomp key={`movie-list-item-${movie.Id}`}>            
            <div>
            <Link to={`movies/${movie.Id}`}>

            <button className='container2'>
              <img className='Moviepicture' src={movie.Poster} alt="Movie Poster"></img>
            </button>
              </Link>
            </div>
            
              
              <p className="p1">{movie.Title} ({movie.Year.substring(0, movie.Year.length - 2)})</p>
              <p className='p2'>{movie.Director}</p>          
            </Mycomp>
          ))
        }
      </List>
    </Page>
  );
};

export default MoviesPage;
