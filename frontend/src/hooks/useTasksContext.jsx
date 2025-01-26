import { useContext } from "react";
import { TasksContext } from "../context/tasksContext";

export const useTasksContext=function(){
    const context=useContext(TasksContext);
    if(!context){
        throw Error("useTaskContext must be used inside an TaskContextProvider");
    }
    return context;
} 