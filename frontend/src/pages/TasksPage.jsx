import { useEffect, useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import Columns from "../components/Columns";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useThemeContext";
import { useDateContext } from "../hooks/useDateContext";
import Task from "../components/Task";


const TasksPage = () => {
  //Styling purposes
  const {theme}=useTheme()
  const textColor= (theme=="dark"?"white":"black")


  const {tasksState,dispatchTasksState}= useTasksContext();
  const {dateState}=useDateContext();
  const [error,setError]=useState('');
  const dateToShow=String(dateState).split(" ")[1]+"/"+String(dateState).split(" ")[2]+"/"+String(dateState).split(" ")[3]
  const dateToAdd=String(dateState).split(" ")[1]+String(dateState).split(" ")[2]+String(dateState).split(" ")[3]
  useEffect(()=>{
      const fetchTasks=async()=>{
        setError('')
        const origin=import.meta.env.VITE_API_URL;
        const response=await fetch(`${origin}/api/task/getTaskByDate/`+dateToAdd,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("user")}`
          }
        })
        const json=await response.json();
        if(!response.ok){
          setError(json.error);
          console.log("error encountered",json.error)
          return ;
        }
        let intermediateCategoryList={};
        json.retrievedTasks.map((task)=>{
          if(!Object.keys(intermediateCategoryList).includes(task["category"])){
            if(task["category"].length>0){
              intermediateCategoryList[task["category"]]=[task]
            }
          }else{
            if(task["category"].length>0){
              intermediateCategoryList[task["category"]]=[...intermediateCategoryList[task.category],task]
            }
          }
        });
        
        dispatchTasksState({type:"SET_TASKS",payload:intermediateCategoryList});
      };
      fetchTasks();
    }
  ,[])
  const elementsList=Object.keys(tasksState).map((key)=>{
    if(tasksState[key].length>0){
      return (
      <Columns key={key} category={key}>
        {
        tasksState[key].map((task)=>{
          return <Task key={task._id} Task={task}/>
        })
        }
      </Columns>
      )
    }
  })

  return (
    <div style={{flexGrow:2}}>
      <div style={{display:"flex",width:"100%",justifyContent:"space-between",padding:"1rem",fontSize:"1.5rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",columnGap:"1rem"}}>
          Choose the day from calender <Link to="/tasks/calender" style={{color:textColor}}>  <img src="/calender.svg" alt="calender" width="32px" />  </Link>
        </div>
        
        <div className="taskPageDate">
          <div>{dateToShow}</div>
          
          <Link to="/tasks/addTask">
            <button className="addingTask"><img src="/plus.svg" width="20px"/>Adding Task</button>
          </Link>
        </div>
      </div>

      <div className="tasksContainer">
        {elementsList}
      </div>

      {error?(
        <div className='errorBox'>
            {error}
        </div>
      )
        : null
      }
    </div>
  )
}

export default TasksPage