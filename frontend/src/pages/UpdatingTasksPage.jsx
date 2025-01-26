import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useThemeContext';

const  UpdatingTaskPage= () => {
  //getting inputs from the selected task
  const location = useLocation();
  const {task_id,task_category,task_title,task_description,task_start,task_end} = location.state || {}


  const [category,setCategory]=useState(task_category);
  const [title,setTitle]=useState(task_title);
  const [description,setDescription]=useState(task_description);
  const [start,setStart]=useState(task_start);
  const [end,setEnd]=useState(task_end);
  const [error,setError]=useState('');

  //For Styling Purposes
  const {theme}=useTheme()
  const formShadow=theme=="dark"?" #FDE93C": " #eb00ff"
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  const formStyle={color:textColor,backgroundColor:bgColor,boxShadow:`0 1px 10px ${formShadow}`,border:`2px solid ${formShadow}`, transition:"0.5s"};
    

  //updating course logic
  const navigate=useNavigate();
  const handleSubmit=async function(e){
    e.preventDefault();
    setError("");
    const origin=import.meta.env.VITE_API_URL;
    try {
    const response=await fetch(`${origin}/api/task/update/${task_id}`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json',
            "Authorization":`Bearer ${localStorage.getItem("user")}`
        },
        body:JSON.stringify({category,title,description,start,end}),
    })

    const json=await response.json()
    
    if(!response.ok){
        setError(json.error);
        return ;
    }
    setError("");
    navigate("/tasks");
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div style={{flexGrow:2,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <form className='Forms' style={formStyle}  onSubmit={handleSubmit}>

        <h2>Update the Task</h2>
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
        
        <button>Update Task</button>
    </form>
      {error!=""?<div className='error'>{error}</div>:[""]}
    </div>
  )
}

export default UpdatingTaskPage