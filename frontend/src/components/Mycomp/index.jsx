import React from "react";

import './styles.css'

const Mycomp = (props) =>(
    <li className="movie-db-props-children">
        {props.children}
    </li>
);

export default Mycomp;