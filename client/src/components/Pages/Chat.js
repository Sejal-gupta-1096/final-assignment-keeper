import io from 'socket.io-client';
import AuthContext from '../../context/auth/authContext'
import React, { Component } from 'react';
import '../../chat.css'

class Chat extends Component {

  // const authContext = useContext(AuthContext)
  // const { user } = authContext

//   useEffect(() => {
//     if (user) {
//         console.log('call')
//         setUpConnections(user);
//     }else{
//       console.log('not present')
//     }
// }, [user])

  
  constructor(props) {
      console.log(props)
    super(props)
    this.state = {
      messages: [], // {content: 'some message', user: user@gmail}
      typedMessage: '',
    };

    this.userEmail = this.props.email
    this.room = this.props.email
    this.socket = io.connect('localhost:8000');
    if(this.userEmail){
        this.setUpConnections();
    }

  }

    // const [state, setState] = useState({
    //   messages: [],
    //   typedMessage: '',
    //   email : '',
    //   room : ''
    // })
    // const { messages, typedMessage , email , room } = state

    // setState({
    //   messages : ["abc" , "def"],
    //   typedMessage : 'sejal'
    // })
    // const socket = io.connect('localhost:8000');
    // console.log(email)
    

  setUpConnections = () =>{
      const socketConnection = this.socket;
      const self = this;

      socketConnection.on('connect' , function(){
          console.log('Connnection Established');
          
          socketConnection.emit('join_room' , {
              user_email : self.userEmail,
              chatroom : self.room
          } , function(messages){
              console.log(messages)
              self.setState({
                  messages : messages
              })
          });

          socketConnection.on('user_joined' , function(){
              console.log('New User Joined');
          })
      })

      socketConnection.on('receive_msg' , function(data) {

        const messageObject = {};
        const messages = self.state.messages;

        messageObject.content = data.message;
        messageObject.user = data.user_email;

        self.setState({
            messages : [...messages , messageObject],
            typedMessage : ''
        })
      })
  }

//   const setUpConnections = (user) =>{
    
//     const socketConnection = socket;
//     // const self = this;

//     socketConnection.on('connect' , function(){
//         console.log('Connnection Established');
        
//         socketConnection.emit('join_room' , {
//             user_email : user.email,
//             chatroom : user.email
//         } , function(chat_messages){
//             console.log(chat_messages.length , typeof(chat_messages))
//             setState({
//                 messages : chat_messages
//             })
//             console.log(messages)
//         });

//         socketConnection.on('user_joined' , function(){
//             console.log('New User Joined');
//         })
//     })

//     socketConnection.on('receive_msg' , function(data) {

//       const messageObject = {};
//       const messages = state.messages;

//       messageObject.content = data.message;
//       messageObject.user = data.user_email;

//       setState({
//           messages : [...messages , messageObject],
//           typedMessage : ''
//       })
//     })
// }

  handleSubmit = () =>{
      const {typedMessage} =  this.state;

      if(typedMessage && this.userEmail){
          this.socket.emit('send_message' , {
              user_email : this.userEmail,
              chatroom : this.room,
              message : typedMessage
          })
      }
  }

//   const handleSubmit = () =>{

//     if(typedMessage && email){
//         socket.emit('send_message' , {
//             user_email : email,
//             chatroom : room,
//             message : typedMessage
//         })
//     }
// }
  
  render() {
    const { typedMessage, messages } = this.state;
    const userEmail = this.userEmail
    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          {/* <img
            src="https://cdn2.iconfinder.com/data/icons/harmonicons-05/64/minus-circle-512.png"
            alt=""
            height={17}
          /> */}
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.user === userEmail
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="chat-container">
  //     <div className="chat-header">
  //       Chat
  //       {/* <img
  //         src="https://cdn2.iconfinder.com/data/icons/harmonicons-05/64/minus-circle-512.png"
  //         alt=""
  //         height={17}
  //       /> */}
  //     </div>
  //     <div className="chat-messages">
  //       {messages.map((message) => (
  //         <div
  //           className={
  //             message.user === email
  //               ? 'chat-bubble self-chat'
  //               : 'chat-bubble other-chat'
  //           }
  //         >
  //           {message.content}
  //         </div>
  //       ))}
  //     </div>
  //     <div className="chat-footer">
  //       <input
  //         type="text"
  //         value={typedMessage}
  //         onChange={(e) => setState({ typedMessage: e.target.value })}
  //       />
  //       <button onClick={handleSubmit}>Submit</button>
  //     </div>
  //   </div>
  // );
}

export default Chat