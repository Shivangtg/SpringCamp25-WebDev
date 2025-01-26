import {Routes,Route, Navigate, useNavigate} from "react-router-dom"
import Navbar from "./components/Navbar"
import { useEffect, useState } from "react"
import { useTheme } from "./hooks/useThemeContext"
import { useUserContext } from "./hooks/useUserContext"
import SideMenu from "./components/SideMenu"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import Profile from "./pages/Profile"
import ChangeProfilePic from "./pages/ChangeProfilePic"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import CalenderPage from "./pages/CalenderPage"
import AddingTasksPage from "./pages/AddingTasksPage"
import UpdatingTaskPage from "./pages/UpdatingTasksPage"


function App() {
  //navbar interactivity
  const [open,setOpen]=useState(false);
  const {theme,dispatchTheme}=useTheme();

  //  Styling the Body 
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  document.getElementsByTagName('body')[0].style.backgroundColor=bgColor;
  document.getElementsByTagName('body')[0].style.color=textColor
  document.getElementsByTagName('body')[0].style.transition="0.5s"

  // refresh logout solving
  const {user,dispatchUser}=useUserContext()
  const navigate=useNavigate();
  useEffect(()=>{
    const origin=process.env.REACT_APP_API_URL;
    const getUser=async function(){
      const response=await fetch(`${origin}/api/user/getUser`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("user")}`
        }
      })
      const json = await response.json();
      if(!response.ok){
        console.log(json.error);
        return ;
      }

      dispatchUser({type:"LOGIN",payload:json.demandedUser});
    }

    if(localStorage.getItem("user")){
      getUser();
      navigate("/profile")
    }
  },[])


  //Navbar interactivity
  const themeChanger=function(){
    dispatchTheme({type:(theme=="dark")?"LIGHT":"DARK"});
  }
  const opener=function(){
    setOpen(!open);
  }

  return (
    <>
    {
      user?
      (<Navbar username={user.username} isOpen={open} opener={opener} themeChanger={themeChanger} title={"Task Helper"} theme={theme}/>):
      (<Navbar isOpen={open} opener={opener} themeChanger={themeChanger} title={"Task Helper"} theme={theme}/>)
    }  
      <div className="big-dabba">
          {open?(user?(<SideMenu isOpen={open} user={user}/>):(<SideMenu isOpen={open}/>)):(null)}
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={!user?<LoginPage/>:<Navigate to="/profile"/>}/>
            <Route path="/signup" element={!user?<SignupPage/>:<Navigate to="/profile"/>}/>
            <Route path="/profile" element={user?<Profile user={user}/>:<Navigate to="/login"/>} />
            <Route path="/tasks" element={user?<TasksPage/>:<Navigate to="/login"/>}/>
            <Route path="/changeProfilePic" element={user?<ChangeProfilePic/>:<Navigate to="/login"/> }/>
            <Route path="/tasks/calender" element={user?<CalenderPage/>:<Navigate to="/login"/>}/>
            <Route path="/tasks/addTask" element={user?<AddingTasksPage/>:<Navigate to="/login"/>}/>
            <Route path="/updateTask" element={user?<UpdatingTaskPage/>:<Navigate to="/login"/>}/>
          </Routes>
      </div>
      </>
  )
}

export default App
