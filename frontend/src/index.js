import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Root from './Root';
import reportWebVitals from './reportWebVitals';

import MoviesPage, { loader as moviesLoader } from './pages/movies';
import MoviePage, { loader as movieLoader } from './pages/movie';
import AboutPage from './pages/about';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <MoviesPage />,
        loader: moviesLoader,
      },
      {
        path: "movies/:movieId",
        element: <MoviePage />,
        loader: movieLoader,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
