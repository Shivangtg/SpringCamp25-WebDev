import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useThemeContext'

const SideMenu = ({isOpen,user}) => {
    
    //styling sideMenu
    const {theme}=useTheme();
    const bgColor=(theme=="dark"?"black":"white")
    const textColor= (theme=="dark"?"white":"black")
    
    const optionsHoverBGColor= (theme=="dark"?"white":"black")
    const optionsHoverColor= (theme=="dark"?"black":"white")
    

    const optionsStyle={color:textColor,backgroundColor:bgColor, transition:"0.1s"};
    const optionsHoverStyle={color:optionsHoverColor,backgroundColor:optionsHoverBGColor, transition:"0.5s"};

    const mouseEnter=(e) => {
        e.currentTarget.style.backgroundColor=optionsHoverStyle.backgroundColor;
        e.currentTarget.style.color=optionsHoverStyle.color;
        e.currentTarget.style.transition=optionsHoverStyle.transition;
    }
    const mouseLeft=(e) => {
        e.currentTarget.style.backgroundColor=optionsStyle.backgroundColor;
        e.currentTarget.style.color=optionsStyle.color;
        e.currentTarget.style.transition=optionsStyle.transition;
    }
    
    if(isOpen && user){
        return (
          <div className="sideMenu">
            <Link to="/tasks" className="options" >
              <div
               style={optionsStyle}
               onMouseEnter={mouseEnter}
               onMouseLeave={mouseLeft}
              >Task</div>
            </Link>
            <Link to="/profile" className="options">
              <div
               style={optionsStyle}
               onMouseEnter={mouseEnter}
               onMouseLeave={mouseLeft}
              >Profile</div>
            </Link>
          </div>
        )
    }
    if(isOpen && !user){
        return (
            <div className="sideMenu">
              <Link to="/login" className="options">
                <div
                 style={optionsStyle}
                 onMouseEnter={mouseEnter}
                 onMouseLeave={mouseLeft}
                >Login</div>
              </Link>
              <Link to="/signup" className="options">
                <div
                 style={optionsStyle}
                 onMouseEnter={mouseEnter}
                 onMouseLeave={mouseLeft}
                >Signup</div>
              </Link>
            </div>
        )
    }
}

export default SideMenu