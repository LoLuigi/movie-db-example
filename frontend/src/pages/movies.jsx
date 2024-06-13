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
  let categorys = {};
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

  const ordered = Object.keys(categorys).sort().reduce(
    (obj, key)=>{
      obj[key] = categorys[key];
      return obj;
    },
    {}
  );
  categorys = ordered

  return { movies,moviesById,categorys };
};

const MoviesPage = () => {
  const { movies } = useLoaderData();
  const {categorys} = useLoaderData();
  const {moviesById} = useLoaderData();
  const [user, setUser] = useContext(UserContext)
  const [filter, setFilter] = useState({ key: null, value: null });

  const onChangeFilter = useCallback((key, value) => {
    setFilter({
      key,
      value,
    })
  },[]);

  if (user !== null){
    return (
      <Page title={"Movies"}>
        {/* <button value="-1" onClick={onBatchchange()}>Previous</button>
        <button value="1" onClick={onBatchchange()}>Next</button> */}
          <Filter movies = {movies} onChange={onChangeFilter}></Filter>
          { 
            Object.entries(categorys).map(([categoryTitle, movieIds]) => (
              <Page title = {`${categoryTitle} (${movieIds.length})`}>
                <List>
                  {movieIds
                    .map((_Id) => moviesById[_Id]) // map ids to movies
                    .filter((movie) => {
                      const value = movie[filter.key]
                      if (filter.key == "Genre") return value.includes(filter.value)
                      return (value == filter.value);
                    })
                    .map((movie) => {
                      return (
                        <Mycomp movie1={movie} key={`movie-list-item-${movie.Id}`} />
                      );
                    })
                  };
                </List>
              </Page>
            ))
          };
      </Page>
    );
  }else{
    return(
    <Page title={"Movies"}>
          { 
            Object.entries(categorys).map(([categoryTitle, movieIds]) => (
              <Page title = {`${categoryTitle} (${movieIds.length})`}>
                <List>
                  {movieIds
                    .map((_Id) => moviesById[_Id]) // map ids to movies
                    .filter((movie) => {
                      const value = movie[filter.key]
                      if (filter.key == "Genre") return value.includes(filter.value)
                      return (value == filter.value);
                    })
                    .map((movie) => {
                      return (
                        <Mycomp movie1={movie} key={`movie-list-item-${movie.Id}`} />
                      );
                    })
                  };
                </List>
              </Page>
            ))
          };
      </Page>
    );
  };
};

export default MoviesPage;
