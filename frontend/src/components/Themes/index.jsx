import React from "react";

const Themes = (props) => {
    return(
        <select className="DropTheme" onChange={props.onChange}>
            <option value="theme1">1</option>
            <option value="theme2">2</option>
            <option value="theme3">3</option>
            <option value="theme4">4</option>
        </select>
    )
};
export default Themes;