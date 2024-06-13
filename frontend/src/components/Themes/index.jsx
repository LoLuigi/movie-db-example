import React , {useContext, useState} from "react";
import UserContext from '../../config/userContext';

const Themes = (props) => {
    const user = props.user
    const theme = props.theme
    if (user===null){
        <select className="DropTheme" onChange={props.onChange}>
            <option value="default">Default</option>
        </select>
    }else
    return(
        <select value={theme} className="DropTheme" onChange={props.onChange}>
            <option value="default">Default</option>
            <option value="theme1">Pop</option>
            <option value="theme2">Sun</option>
            <option value="theme3">Night</option>
            <option value="theme4">Purple</option>
            <option value="theme5">Frog</option>
            <option value="theme6">Hell</option>
            <option value="theme7">7</option>
        </select>
    )
};
export default Themes;