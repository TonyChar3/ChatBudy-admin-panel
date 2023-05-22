import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    return(
        <UserContext.Provider>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}