import io from 'socket.io-client';

import React, { Component , useContext , useState , useEffect} from 'react';
import AuthContext from '../../context/auth/authContext'
import '../../chat-room.css'
import AdminChat from './AdminChat';

function ChatRoom () {

 
  const authContext = useContext(AuthContext)
  const { all_users , user , loadUser, fetchUsers} = authContext

  console.log(authContext)
 
  const [state, setstate] = useState({
    current_user : null,
    user : null
})

useEffect(() => {
  //eslint-disable-next-line
  loadUser()
  fetchUsers()
  if(user){
    setstate({
    user : user
  })
  console.log(user);
  console.log(all_users);
  }

}, [])

// useEffect(() => {
  
//   console.log(authContext)
//   console.log(all_users)
//   if (user) {
//     console.log(authContext)
//     console.log(all_users)
//       setstate({
//         user : user
//       })
//   }
  
// }, [user])

    // constructor() {
    //   super()
    //   this.state = {
    //     users: [{email:'janvi@gmail.com' , name:'janvi'} , {email:'krish@gmail.com' , name:'krish'}],
    //     current_user : null
    //   };
  
    // }

    const handleCurrentUser = (user) =>{
      setstate({
        current_user:user
      })
    }

    // handleCurrentUser = (user) =>{
    //   this.setState({
    //     current_user:user
    //   })
    // }
    
  // render() {
  //   console.log(this.state.current_user)
  //   let current_user = this.state.current_user;
  //   let users = this.state.users
  //   return (
  //       <div className="admin-chat-container">
  //           <header className="admin-chat-header">
  //               <h1><i className="fas fa-smile"></i> ChatCord</h1>
  //               <h3><i className="fas fa-comments"></i> Room Name:</h3>
  //               <h2 id="room-name"></h2>
  //           </header>
  //           <main className="admin-chat-main">
  //               <div className="admin-chat-sidebar">
  //               <a href="/fetch-users" ><h3><i className="fas fa-users"></i> Users</h3></a>
  //               <ul id="users">
  //               {users.map( (user) => {
  //                 return <li onClick={() => this.handleCurrentUser(user)}>{user.name}</li>
  //               })}
  //               </ul>
  //               </div>
  //             {current_user == null ? null :<AdminChat current_user={this.state.current_user}/> }
  //           </main>
  //       </div>
  //    );
  // }

  

  return (
    <div className="admin-chat-container">
        <header className="admin-chat-header">
            <h1><i className="fas fa-smile"></i> ChatCord</h1>
            <h3><i className="fas fa-comments"></i> Room Name:</h3>
            <h2 id="room-name"></h2>
        </header>
        <main className="admin-chat-main">
            <div className="admin-chat-sidebar">
            <h3><i className="fas fa-users"></i> Users</h3>
            <ul id="users">
            {all_users.map( (user) => {
              return <li onClick={() => handleCurrentUser(user)}>{user.name}</li>
            })}
            </ul>
            </div>
          {state.current_user == null ? null :<AdminChat current_user={state.current_user}/> }
        </main>
    </div>
 );
}


export default ChatRoom;
