import { Link } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"


const HomePage = () => {

  const {user}=useUserContext()
  return (
    <div style={{display:"flex", flexDirection:"column",alignItems:"center", rowGap:"2rem",flexGrow:2}}>
        <img src="/vite.svg" alt="" width="400px" id="logo"/>
        <h1>Manage your tasks easily</h1>
        {!user?(
        <div className="bottomPart">          
            <Link to="/login">
                <button>
                    Log In
                </button>
            </Link>
            <Link to="/signup">
                <button>
                    Sign Up
                </button>
            </Link>
        </div>
        ):
        (<div style={{display:"flex",width:"100%",justifyContent:"center"}}>          
            <Link to="/profile">
                <button>
                    Your Profile
                </button>
            </Link>
        </div>)
        }
        
    </div>
  )
}

export default HomePage