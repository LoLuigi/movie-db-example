import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';

import './Root.css';
import './components/Themes/styles.css'
import Themes from './components/Themes';


const Root = () => {
  const [theme, setTheme] = useState("theme3")
  const onThemeChange = useCallback((key) =>{
    const { target: {value}} = key
    setTheme(value)
  })

  {document.body.className=(theme)}
  return(
  <div className={theme}>
    <Header/>
    <div className='app-root'>
      <Themes onChange={onThemeChange}></Themes>
      <Outlet />
    </div>
  </div>
)};

export default Root;
