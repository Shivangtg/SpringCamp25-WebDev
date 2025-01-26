import { useContext } from "react";
import { DateContext } from "../context/dateContext";

export const useDateContext=function(){
    const context=useContext(DateContext);
    if(!context){
        throw Error("useDateContext must be used inside an DateContextProvider");
    }
    return context;
} 