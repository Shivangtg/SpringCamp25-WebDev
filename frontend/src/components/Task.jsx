import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useThemeContext"
import { useTasksContext } from "../hooks/useTasksContext";

const Task= ({Task}) => {
  const {theme}=useTheme()
  const strongColor=theme=="dark"?"yellow":" #ff008d";
  const border=theme=="dark"?" #ff008d":" #ff6c00";
  const buttonBg=(theme=="dark"?"white":"#ffd3d3");
  const interactionBtnGlow=(theme=="dark"?"darkGlow":"lightGlow");
  // const borderShadow=theme=="dark"?"blueviolet":"yellow";
  const boxStyle={border:`2px solid ${border}`,boxShadow:`0 0 10px ${border}`};



  //deleting logic
  const {dispatchTasksState}=useTasksContext()
  const deletingTask=async function(){
    const response=await fetch(`http://localhost:6789/api/task/delete/${Task._id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("user")}`
        }
    })
    const json=await response.json();
    if(response.ok){
        // console.log("deleted the card",json.data);
        dispatchTasksState({type:"DELETE_TASK",payload:{category:json.deletedTask.category,task:json.deletedTask}})
    }else{
        // console.log("can'nt delete the card",json.error)
    }
  }


  return (
    <div draggable="true" className="Task" style={boxStyle}>
      <div>
        <strong style={{color:strongColor}}>Title: </strong>{Task.title}
      </div>
      {Task.description?
      <div>
        <strong style={{color:strongColor}}>Description: </strong>{Task.description}
      </div>:null
      }
      <div>
        <strong style={{color:strongColor}}>Duration: </strong>{Task.start}:{Task.end}
      </div>

      <div className="bottomPartTask">
      <button className="deleteBtn" onMouseEnter={(e)=>{e.currentTarget.classList.add(interactionBtnGlow)}} onMouseLeave={(e)=>{e.currentTarget.classList.remove(interactionBtnGlow)}}  onClick={deletingTask} style={{backgroundColor:buttonBg,borderRadius:"50%",width:"34px", height:"34px"}}>
          <img className="interactiveImage" src="/delete.svg" style={{backgroundColor:buttonBg,borderRadius:"50%"}} width="30px" />
      </button>
      <Link to="/updateTask" state={{
          task_id:Task._id,
          task_category:Task.category,
          task_title:Task.title,
          task_description:Task.description||'',
          task_start:Task.start,
          task_end:Task.end,
          task_date:Task.date
      }}>
          <button className="updateBtn" onMouseEnter={(e)=>{e.currentTarget.classList.add(interactionBtnGlow)}} onMouseLeave={(e)=>{e.currentTarget.classList.remove(interactionBtnGlow)}} style={{backgroundColor:buttonBg,borderRadius:"50%",width:"34px", height:"34px"}}>
              <img className="interactiveImage" src="/update.svg" style={{backgroundColor:buttonBg,borderRadius:"50%"}} width="30px" />
          </button>
      </Link>
      </div>
    </div>
  )
}

export default Task