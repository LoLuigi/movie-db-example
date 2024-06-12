import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext([() => {}, {}]);

export const ThemeProvide = ({children}) => {
    const [theme, setTheme] = useState("default");
    return(
        <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
    )
}
export default ThemeContext