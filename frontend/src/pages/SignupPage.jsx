import { useState } from 'react'
import { useUserContext } from '../hooks/useUserContext'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useThemeContext'

const SignupPage = () => {
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
  const [useremail,setUseremail]=useState(''); 
  const [error,setError]=useState('');
  const [userimage,setUserimage]=useState('');

  const signinUpUser=async function(e){
    
    e.preventDefault();
    setError('');
    
    const origin=import.meta.env.VITE_API_URL;
    const responseToken=await fetch(`${origin}/api/user/signup`,{
        method:"POST",
        body:JSON.stringify({username,useremail,password,userimage}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const jsonToken=await responseToken.json();
    
    if(!responseToken.ok){
        setError(jsonToken.error);
        console.log(json.error);
        return ;
    }
    localStorage.setItem("user",jsonToken.token)
    
    const responseUser=await fetch("http://localhost:6789/api/user/getUser",{
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
    <form className='Forms' style={formStyle} onSubmit={signinUpUser}>
        <label>User Name:
            <input type="text" name='username' value={username} onChange={(e)=>{setUsername(e.currentTarget.value)}} required />
        </label>
        
        <label>User Email:
            <input type="text" name='useremail' value={useremail} onChange={(e)=>{setUseremail(e.currentTarget.value)}} required />
        </label>

        <label>Password:
            <input type="text" name='password' value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}} required />
        </label>

        <label>Profile Picture:
            <input type="text" name='userimage' value={userimage} onChange={(e)=>{setUserimage(e.currentTarget.value)}} />
        </label>


        <button>Sign Up</button>

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

export default SignupPage