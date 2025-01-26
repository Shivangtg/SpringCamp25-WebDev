import { createContext, useReducer } from "react";

export const TasksContext=createContext()
const taskReducer=(state,action)=>{
    switch (action.type) {
        case "SET_TASKS":
            return action.payload;
        case "ADD_TASK":{
            console.log(state)
            if(Object.keys(state).includes(action.payload.category)){
                return state[action.payload.category].push(action.payload);
            }
            const copy={...(state)};
            copy[action.payload.category]=[action.payload]
            return copy;
        }
        case "DELETE_TASK":{
            const newState={...(state)};
            console.log("1",newState)
            newState[action.payload["category"]]=newState[action.payload["category"]].filter(
                (task)=>{
                    if(task._id!=action.payload["task"]._id){
                        return true;
                    }else{
                        return false;
                    }
                }
            );
            console.log("2",newState)
            return newState;
        }
        default:
            break;
    }
}

export const TasksContextProvider=function({children}){
    const initialState={};
    const [tasksState,dispatchTasksState]=useReducer(taskReducer,initialState);
    return (
        <TasksContext.Provider value={{tasksState,dispatchTasksState}}>
            {children}
        </TasksContext.Provider>
    )
}