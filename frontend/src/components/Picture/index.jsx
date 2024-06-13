import React from "react";
import PropTypes from "prop-types";
import './styles.css';
import 'bootstrap/';

const Picture = (props) =>{
    // console.log(props)
    const customClassname = props.className ? `Moviepicture ${props.className}` : "Moviepicture";
    return(
    <img className= {customClassname} src={props.src} alt="Movie Poster"/>
    );
};

Picture.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired
};

export default Picture;
