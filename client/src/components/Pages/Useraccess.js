import React,{useContext} from 'react'
import AuthContext from '../../context/auth/authContext'
import {Route,Redirect} from 'react-router-dom'
import User from './User'

const Useraccess = () => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated} = authContext
    return (
    <div>
       {isAuthenticated?<User/>:(<Redirect to='/login'/>)}
    </div>
    )
}

export default Useraccess;
