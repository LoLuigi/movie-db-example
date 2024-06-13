import React, { useCallback, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import './Root.css';
import './components/Themes/styles.css';
import Themes from './components/Themes';
import ThemeContext from './config/themeContext';
import UserContext from './config/userContext';

const Root = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);

  const onThemeChange = useCallback((key) =>{
    const { target: {value}} = key;
    setTheme(value);
  });

  {document.body.className=(theme)};
  return(
  <div className={theme}>
    <Header/>
    <div className='app-root'>
      <Themes theme={theme} onChange={onThemeChange} user={user}></Themes>
      <Outlet />
    </div>
  </div>
  );
};

export default Root;
