import React from "react";

const Themes = (props) => {
    return(
        <select className="DropTheme" onChange={props.onChange}>
            <option value="default">Default</option>
            <option value="theme1">Ocean</option>
            <option value="theme2">Dessert</option>
            <option value="theme3">Beach</option>
            <option value="theme4">Purple</option>
            <option value="theme5">Leaves</option>
            <option value="theme6">Night</option>
        </select>
    )
};
export default Themes;