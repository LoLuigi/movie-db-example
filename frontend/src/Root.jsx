import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import './Root.css';
import './pages/themes.css'

const theme = "theme3"
const Root = () => {
  {document.body.className=(theme)}
  return(
  <div className={theme}>
    <Header/>
    <div className='app-root'>
      <Outlet />
    </div>
  </div>
)};

export default Root;
