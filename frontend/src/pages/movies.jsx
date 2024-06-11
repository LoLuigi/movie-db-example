import React, { useCallback, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {useContext } from 'react';

import UserContext from '../config/userContext';
import MovieAPI from '../apis/MovieAPI';

import Page from '../components/Page';
import List from '../components/List';
import Mycomp from '../components/Mycomp';
import Filter from '../components/Filter';



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
  const [user, setUser] = useContext(UserContext)
  console.log(user)


  const [filter, setFilter] = useState({ key: null, value: null });

  const onChangeFilter = useCallback((key, value) => {
    // console.log(value)
    setFilter({
      key,
      value,
    })
    
    // update filter...
  },[]);
  // to get an element from list: list.find()
  // to use map on object, convert to to list first: Object.values()
  // list.length gives number of items
  return (
    <Page title={"Movies"}>
        <Filter movies = {movies} onChange={onChangeFilter}></Filter>
        { 
          Object.entries(categorys).map(([categoryTitle, movieIds]) => (
            <Page title = {`${categoryTitle} (${movieIds.length})`}>
              <List>
                {/* {console.log(categorys)} */ }
                {movieIds
                  .map((_Id) => moviesById[_Id]) // map ids to movies
                  .filter((movie) => {
                    const value = movie[filter.key]
                    if (filter.key == "Genre") return value.includes(filter.value)
                    return (value == filter.value);
                  })
                  .map((movie) => {
                    // console.log(movie)
                    return (
                      <Mycomp movie1={movie} key={`movie-list-item-${movie.Id}`} />
                    );
                  })
                }
              </List>
            </Page>
          ))
        }
    </Page>
  );
};

export default MoviesPage;
