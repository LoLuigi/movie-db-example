import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import './Root.css';

const Root = () => (
  <div>
    <Header />
    <div className='app-root'>
      <Outlet />
    </div>
  </div>
);

export default Root;
