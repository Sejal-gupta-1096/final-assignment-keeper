import React,{Fragment,useContext} from 'react'
import '../../App.css'
import AuthContext from '../../context/auth/authContext'
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PersonIcon from '@material-ui/icons/Person';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import HomeIcon from '@material-ui/icons/Home';
const Navbar = () => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated,user,logout} = authContext
    const handleClick = ()=>{
        logout()
    }
    let name = '';
    if(user){
        name=user.name
    }
    return (
       
        <nav class="navbar navbar-expand-lg navbar-light ">
             
                <a className="navbar-brand text-white" href="/" style={{fontSize:'1.8rem'}}><ControlCameraIcon fontSize="large"/> Eracost</a>
                <button class="navbar-toggler" style={{color:"#fff"}} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <DehazeIcon/>
                </button>

                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto text-center">
                    <li className="nav-item" >
                                    <a className="nav-item nav-link active text-white" href="/"><HomeIcon/> Home</a>
                    </li>
                    <li className="nav-item" >
                                    <a className="nav-item nav-link active text-white" href="/register"><FingerprintIcon/> Register</a>
                    </li>
                    <li className="nav-item">
                                    <a className="nav-item nav-link active text-white" href="/login"><PersonIcon/> Login</a>
                    </li>
                    <li className="nav-item">
                                    <a className="nav-item nav-link active text-white" href="/about"><EmojiFoodBeverageIcon/> About</a>
                    </li>
                                {isAuthenticated?(<li className="nav-item">
                                    <a className="nav-item nav-link active text-white" href="/login" onClick={handleClick}><ExitToAppIcon/> Logout</a>
                                </li>):<></>}
                    
                    </ul>
                </div>
            
        </nav>
        
    )

}
export default Navbar
// #3f51b5