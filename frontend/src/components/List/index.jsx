import React from 'react';

import './styles.css';

const List = ({ children }) => (
  <ul className="movie-db-list">
    {children}
  </ul>
);

export default List;
