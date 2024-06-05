import React from "react";
import PropTypes from "prop-types";
//import '../values/colors.js'
import './styles.css'
import 'bootstrap/'
import { propTypes } from "react-bootstrap/esm/Image";

const Picture = (props) =>{
    // console.log(props)
    const customClassname = props.className ? `Moviepicture ${props.className}` : "Moviepicture"
    return(
    <img className= {customClassname} src={props.src} alt="Movie Poster"/>
)};

Picture.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired
}

export default Picture;
