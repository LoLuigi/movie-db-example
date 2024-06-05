import React from 'react';
import ReactDOM from 'react-dom';   
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

import MovieAPI from '../apis/MovieAPI';

import Page from '../components/Page';
import List from '../components/List';
//import ListItem from '../components/ListItem';
import Mycomp from '../components/Mycomp';
import Picture from '../components/Picture';



export async function loader() {
  const movies = await MovieAPI.getAllBatch(1, 250);
  const categorys = {};
  movies.forEach((movie) => {
    const {Genre,Id} = movie
    const genre = Genre.split(",")
    genre
    .map((_genre)=>_genre.trim())
    .forEach((_genre)=> {
      const list = categorys[_genre] || [];
      list.push(Id);
      categorys[_genre]=list
    });
  });

  const moviesById = movies.reduce((prev, cur) => {
    const { Id } = cur;
    return {
      ...prev,
      [Id]: cur,
    };
  }, {});

  // console.log(moviesById);
  // console.log(categorys)
  return { movies,moviesById,categorys };
  
}

const MoviesPage = () => {
  const { movies } = useLoaderData();
  // console.log({movies});
  const {categorys} = useLoaderData();
  // let categorysList = Object.keys(categorys);
  const {moviesById} = useLoaderData();

  // to get an element from list: list.find()
  // to use map on object, convert to to list first: Object.values()
  // list.length gives number of items
  return (
    <Page title="Movies">
      {
      Object.entries(categorys).map(([categoryTitle, categorysList]) => (
        <Page title = {`${categoryTitle} (${categorysList.length})`}>
        {categorysList.map((_Id) => {
        const movie = moviesById[_Id]
        })}
        <List>
          {
            categorysList.map((_Id) => (                            
              <Mycomp movie1={moviesById[_Id]} key={`movie-list-item-${_Id}`}>            
              {/* <div>
              <Link to={`movies/${movie.Id}`}>
              <Picture src={movie.Poster}/>
              </Link>
              </div>
                <p className="p1">{movie.Title} ({movie.Year.substring(0, movie.Year.length - 2)})</p>
                <p className='p2'>{movie.Director}</p>           */}
              </Mycomp>
            
          ))}
        </List>

      </Page>
      ))
    };
      </Page>
  );
};

export default MoviesPage;
