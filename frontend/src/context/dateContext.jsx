import { createContext, useReducer } from "react";

export const DateContext=createContext()
const dateReducer=(state,action)=>{
    switch (action.type) {
        case "SET_DATE":
            return action.payload;
        default:
            break;
    }
}

export const DateContextProvider=function({children}){
    const initialState=new Date();
    const [dateState,dispatchDateState]=useReducer(dateReducer,initialState);
    return (
        <DateContext.Provider value={{dateState,dispatchDateState}}>
            {children}
        </DateContext.Provider>
    )
}