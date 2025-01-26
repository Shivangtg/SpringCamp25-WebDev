import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"

const Navbar = ({title,theme,isOpen,opener,themeChanger,username}) => {
  // styling 
  const navbarShadow=theme=="dark"?" #00fff3": " #ff0000"
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  const linkColor= (theme=="dark"?"white":"black")
  const menuIcon= (theme=="dark"?"/darkMenu.svg":"/lightMenu.svg")
  const crossIcon= (theme=="dark"?"/darkCross.svg":"/lightCross.svg")
  const sunIcon= (theme=="dark"?"/darkSun.svg":"/lightSun.svg")
  const moonIcon= (theme=="dark"?"/darkMoon.svg":"/lightMoon.svg")

  const navbarStyle={color:textColor,backgroundColor:bgColor,boxShadow:`0 1px 10px ${navbarShadow}`,borderBottom:`2px solid ${navbarShadow}`, transition:"0.5s"};
  const linkStyle={color:linkColor}
  
  const navigator=useNavigate()
  const {dispatchUser}=useUserContext();
  const logout=function(){
    dispatchUser({type:"LOGOUT"});
    localStorage.removeItem("user");
    navigator("/login");
  }
  if(username){
  return (
    <div className='Navbar' style={navbarStyle}>
        <div>
            <img src={isOpen?crossIcon:menuIcon} alt="image" width="34px" onClick={opener}/>
            <Link to="/" style={{color:linkColor}}>
                <h2>{title}</h2>
            </Link>
        </div>
        <div>
            <Link to="profile" style={{color:textColor}}>
                <h2>{username}</h2>
            </Link>
            <img src={theme=="dark"?sunIcon:moonIcon} alt="" width="34px" onClick={themeChanger}/>
            <button onClick={logout}>Logout</button>
        </div>
    </div>
  )
  }else{
    return (
    <div className='Navbar' style={navbarStyle}>
        <div>
            <img src={isOpen?crossIcon:menuIcon} alt="image" width="34px" onClick={opener}/>
            <Link to="/" style={{color:linkColor}}>
                <h2>{title}</h2>
            </Link>
        </div>
        <div>
            <img src={theme=="dark"?sunIcon:moonIcon} alt="" width="34px" onClick={themeChanger}/>
            <div className="auth-container">
                <Link to="/login" style={linkStyle}>Login</Link>
                <Link to="/signup" style={linkStyle}>Signup</Link>
            </div>
        </div>
    </div>
    )
  }
}

export default Navbar