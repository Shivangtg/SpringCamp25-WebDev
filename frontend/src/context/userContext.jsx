 
import { createContext, useReducer } from "react"
export const UserContext=createContext()
const reducerFunction=function(state,action){
    switch (action.type) {
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return null;
    }

}
export const UserContextProvider=function({children}){
    const initialState=null;

    const [user,dispatchUser]=useReducer(reducerFunction,initialState)

    return( 
        <UserContext.Provider value={{user,dispatchUser}}>
            {children}
        </UserContext.Provider>
    )
}
