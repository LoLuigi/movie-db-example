import React from "react";

//import '../values/colors.js'
import './styles.css'


const Mycomp = (props) =>(
    <li className="movie-db-props-children">
        {props.children}
    </li>
);

export default Mycomp;

