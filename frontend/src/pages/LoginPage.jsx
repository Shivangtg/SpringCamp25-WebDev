import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useThemeContext'

const LoginPage = () => {
  //styling
  const {theme}=useTheme()
  const formShadow=theme=="dark"?" #FDE93C": " #eb00ff"
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  const formStyle={color:textColor,backgroundColor:bgColor,boxShadow:`0 1px 10px ${formShadow}`,border:`2px solid ${formShadow}`, transition:"0.5s"};
  //state managment
  const navigate=useNavigate()
  const {dispatchUser}=useUserContext();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  const loginUser=async function(e){
    
    e.preventDefault();
    setError('');
    const origin=import.meta.env.VITE_API_URL;
    // console.log(origin)
    const responseToken=await fetch(`${origin}/api/user/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({username,password})
    });
    const jsonToken=await responseToken.json();
    if(!responseToken.ok){
        setError(jsonToken.error);
        return ;
    }
    localStorage.setItem("user",jsonToken.token);
    
    const responseUser=await fetch(`${origin}/api/user/getUser`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${jsonToken.token}`
        }
    })
    const jsonUser=await responseUser.json()


    await dispatchUser({type:"LOGIN",payload:jsonUser.demandedUser});
    navigate("/profile");
  }



  return (
    <div className='formContainer' style={{color:textColor,backgroundColor:bgColor,flexGrow:2,height:"100%",padding:"5rem"}}>
    <form className='Forms' style={formStyle} onSubmit={loginUser}>
        <label>User Name:
            <input type="text" name='username' value={username} onChange={(e)=>{setUsername(e.currentTarget.value)}} required />
        </label>

        <label>Password:
            <input type="text" name='password' value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} required />
        </label>
        
        <div className="bottomPart">
            <button>Log In</button>
            <Link to="/signup" style={{color:textColor}}>New user?</Link>
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


export default LoginPage