import React, {createContext, useContext, useState} from 'react';
import { getCookie, getSessionId, getJSessionId } from "../utils/getCookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [sessionid, setSessionid] = useState(getCookie("csrftoken"));
    //console.log("waah", sessionid, getCookie("sessionid"), document.cookie);
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionid ? true : false
    );

    const handleLogin = ({ history }) => {
        setIsAuthenticated(true);
        //alert('authenticate')
        setSessionid(getCookie("csrftoken"));
        history.replace("/");
        return null;
    };

    const handleLogout = ({ history }) => {
        setIsAuthenticated(false);
        setSessionid(null);
        history.replace("/");
        return null;
    };

    return <AuthContext.Provider
        value={{
            isAuthenticated,
            sessionid,
            handleLogin,
            handleLogout
        }}>
        {children}
    </AuthContext.Provider>
}

export const useGlobalReducer = () => useContext(AuthContext)
