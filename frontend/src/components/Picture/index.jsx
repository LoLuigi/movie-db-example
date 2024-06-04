import React from "react";

//import '../values/colors.js'
import './styles.css'
import 'bootstrap/'

const Picture = (props) =>{
    // console.log(props)
    return(
    <img className="Moviepicture" src={props.src} alt="Movie Poster"/>
)};
export default Picture;
