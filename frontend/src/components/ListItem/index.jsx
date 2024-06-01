import React from 'react';

import './styles.css'

const ListItem = ({ children }) => (
  <li className="movie-db-list-item">
    {children}
  </li>
);

export default ListItem;
