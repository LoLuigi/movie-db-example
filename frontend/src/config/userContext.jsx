import { createContext, useState, useEffect } from "react";

export const UserContext = createContext([() => {}, {}]);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    console.log(user)
    return(
        <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
    )
}
export default UserContext