 
import { createContext, useReducer } from "react"
export const ThemeContext=createContext()
const reducerFunction=function(state,action){
    switch (action.type) {
        case "LIGHT":
            return "light";
        case "DARK":
            return "dark";
    }

}
export const ThemeContextProvider=function({children}){
    const initialState="dark";

    const [theme,dispatchTheme]=useReducer(reducerFunction,initialState)

    return( 
        <ThemeContext.Provider value={{theme,dispatchTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

