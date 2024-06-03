import React from "react";

const Mycomp = (props) =>(
    <li className="movie-db-props-children">
        {props.children}
    </li>
);

export default Mycomp;