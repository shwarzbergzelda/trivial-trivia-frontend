import { createContext, useReducer, useContext } from "react";

export const LoginContext = createContext();

const loginContext = {
    username: "",
    displayUserProfile: false
}

const ACTIONS = {
    SET_USERNAME: 'setUsername',
    SET_DISPLAY_USER_PROFILE: 'setUserProfile'
}

const loginReducer = (loginContext, action) => {
    switch(action.type) {
        case ACTIONS.SET_USERNAME: 
            return {username: action.payload};
        case ACTIONS.SET_DISPLAY_USER_PROFILE: 
            return {displayUserProfile: true};
        default:
            throw new Error();
    }
}

return <LoginContext.Provider value={{ context, dispatch }}>{props.children}</LoginContext.Provider>

export const useLoginContext = () => useContext(LoginContext);