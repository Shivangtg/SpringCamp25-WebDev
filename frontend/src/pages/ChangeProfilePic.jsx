import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import { useState } from "react"
import { useTheme } from "../hooks/useThemeContext"

const ChangeProfilePic = () => {
    //Styling thing
    const {theme}=useTheme()
    const formShadow=theme=="dark"?" #FDE93C": " #eb00ff"
    const bgColor=(theme=="dark"?"black":"white")
    const textColor= (theme=="dark"?"white":"black")
    const formStyle={color:textColor,backgroundColor:bgColor,boxShadow:`0 1px 10px ${formShadow}`,border:`2px solid ${formShadow}`, transition:"0.5s"};
    
    const [userimage,setUserimage]=useState('');
    const [error,setError]=useState('');
    const {dispatchUser}=useUserContext();
    const navigate=useNavigate()

    const changeProfilePic = async function(e){
        e.preventDefault();
        const response=await fetch("http://localhost:6789/api/user/update/",{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("user")}`
            },
            body:JSON.stringify({userimage})
        })
        const json=await response.json();
        if(!response.ok){
            setError(json.error);
            return ;
        }
        console.log("dash",json,json.updatedUser);
        await dispatchUser({type:"LOGIN",payload:json.updatedUser});
        navigate("/profile");
    }


    return (
        <div className='formContainer' style={{color:textColor,backgroundColor:bgColor,flexGrow:2,height:"100%",padding:"5rem"}}>
        <form className='Forms' style={formStyle} onSubmit={changeProfilePic}>
            <label>User Image:
                <input type="text" name='username' value={userimage} onChange={(e)=>{setUserimage(e.currentTarget.value)}} required />
            </label>
            
            <div className="bottomPart">
                <button>Change</button>
                <Link to="/profile">
                    <button type="button" className="cancleButton">Cancle</button>
                </Link>
            </div>

            {error? (
                <div className='errorBox'>
                    {error}
                </div>
            )
            : null}
        </form>
        </div>
      )
  
}

export default ChangeProfilePic