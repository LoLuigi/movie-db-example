import React from "react";
import { Link } from 'react-router-dom';

//import '../values/colors.js'
import './styles.css'
import Picture from '../Picture';



const Mycomp = ({movie1}) =>
    (
    // console.log(movie1)
    <li className="movie-db-props-children">
        <div>
              <Link to={`movies/${movie1.Id}`}>
              <Picture src={movie1.Poster}/>
              </Link>
              </div>
                <p className="p1">{movie1.Title} ({movie1.Year.substring(0, movie1.Year.length - 2)})</p>
                <p className='p2'>{movie1.Director}</p>
    </li>
);

export default Mycomp;

