import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useThemeContext';
import { useDateContext } from '../hooks/useDateContext';
import { useTasksContext } from '../hooks/useTasksContext';


const  AddingTasksPage= () => {
 
  const [category,setCategory]=useState('');
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [start,setStart]=useState('');
  const [end,setEnd]=useState('');
  const [error,setError]=useState('');

  //For Styling Purposes
  const {theme}=useTheme()
  const formShadow=theme=="dark"?" #FDE93C": " #eb00ff"
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  const formStyle={color:textColor,backgroundColor:bgColor,boxShadow:`0 1px 10px ${formShadow}`,border:`2px solid ${formShadow}`, transition:"0.5s"};
    

  //adding course logic
  const {dispatchTasksState}=useTasksContext();
  const {dateState}=useDateContext();
  const dateToAdd=String(dateState).split(" ")[1]+String(dateState).split(" ")[2]+String(dateState).split(" ")[3]
  const navigate=useNavigate();
  const handleSubmit=async function(e){
    e.preventDefault();
    setError("");
    const origin=process.env.REACT_APP_API_URL;
    try {
    const response=await fetch(`${origin}/api/task/addTask`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":`Bearer ${localStorage.getItem("user")}`
        },
        body:JSON.stringify({category,title,description,start,end,date:dateToAdd}),
    })

    const json=await response.json()
    
    if(!response.ok){
        setError(json.error);
        return ;
    }
    setError("");
    dispatchTasksState({type:"ADD_TASK",payload:json.task});
    navigate("/tasks");
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div style={{flexGrow:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <form className='Forms' style={formStyle}  onSubmit={handleSubmit}>

        <h2>Add a New Task</h2>
        <label>Category:</label>
        <input type="text" name='taskCategory' value={category} onChange={(e)=>{setCategory(e.currentTarget.value)}}/>

        <label>Title:</label>
        <input type="text" name='taskTitle' value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>

        <label>Description:</label>
        <input type="text" name='taskDescription' value={description} onChange={(e)=>{setDescription(e.currentTarget.value)}}/>
        
        <label>Start:</label>
        <input type="text" name='taskStart' value={start} onChange={(e)=>{setStart(e.currentTarget.value)}}/>
        
        <label>End:</label>
        <input type="text" name='taskEnd' value={end} onChange={(e)=>{setEnd(e.currentTarget.value)}}/>
        
        <button>Add Task</button>
    </form>
      {error!=""?<div className='error'>{error}</div>:[""]}
    </div>
  )
}

export default  AddingTasksPage