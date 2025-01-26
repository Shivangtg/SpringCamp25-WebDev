import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "../hooks/useThemeContext"
import { useUserContext } from "../hooks/useUserContext"

const Profile = ({user}) => {
  //   Styling thing 
  const {theme}=useTheme()
  const formShadow=theme=="dark"?" #FDE93C": " #eb00ff"
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  const Style={color:textColor,backgroundColor:bgColor,boxShadow:`0 1px 10px ${formShadow}`,border:`2px solid ${formShadow}`,width:"300px", transition:"0.5s",padding:"2rem",flexGrow:2,boxSizing:"content-box",textAlign:"center",rowGap:"1rem",borderRadius:"15px"};
  

  // deleting the user
  const navigate=useNavigate()

  const {dispatchUser}=useUserContext()
  const deleteUser=async function(){
    const origin=import.meta.env.VITE_API_URL;
    const response=await fetch(`${origin}/api/user/delete/`,{
      method:"DELETE",
      headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("user")}`
      }
    })
    const json=await response.json();
    if(response.ok){
      dispatchUser({type:"LOGOUT"});
      navigate("/logout");
      return ;
    }
    console.log("cann't delete the user" , json.error);
  }

  return (
    <div style={{flexGrow:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    <div style={Style}>
        <div className='profilePictureContainer'>
            <img src={user.userimage} alt="user Image" className='profilePicture'/>
        </div>

        <div style={{display:"flex",flexDirection:"column",rowGap:"1rem"}}>
          <h2>{user.username}</h2>
          <p>{user.useremail}</p>
          <div className="bottomPart">
            <Link to="/changeProfilePic">
                <button>Change Profile Picture</button>
            </Link>
            <button onClick={deleteUser} className="cancleButton">delete User</button>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Profile