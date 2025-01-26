import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export const useTheme=function(){
    const context=useContext(ThemeContext);
    if(!context){
        throw Error("useThemeContext must be used inside an ThemeContextProvider");
    }
    return context;
} 