

import io from 'socket.io-client';

import React, { Component} from 'react';
import '../../chat-room.css'

class AdminChat extends Component {
    
    constructor(props){
        super(props)
        console.log(props.current_user)
        this.state = {
            messages: [], // {content: 'some message', user: user@gmail}
            typedMessage: '',
          };

        this.userEmail = 'sejal@gmail.com'
        this.room = props.current_user.email
        this.socket = io.connect('localhost:8000');
        if(this.userEmail){
            this.setUpConnections();
        }
    }

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

    handleSubmit = (event) =>{
        event.preventDefault();
        const {typedMessage} =  this.state;
  
        if(typedMessage && this.userEmail){
            this.socket.emit('send_message' , {
                user_email : this.userEmail,
                chatroom : this.room,
                message : typedMessage
            })
        }
    }

  render() {
    const { typedMessage, messages } = this.state;
    const userEmail = this.userEmail
    return (
        <div className="admin-chat-messages">
            <div class="message-container">
            {messages.map((message) => (
            <div
              className={
                message.user === userEmail
                  ? 'message self-message'
                  : 'message other-message'
              }
            >
              {message.content}
            </div>
          ))}
            </div>
            <div className="admin-chat-form-container">
                <form id="admin-chat-form">
                <input
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    value={typedMessage}
                    onChange={(e) => this.setState({ typedMessage: e.target.value })}
                />
                <button className="btn" onClick={(event) => this.handleSubmit(event)}><i className="fas fa-paper-plane"></i> Send</button>
                </form>
            </div>
        </div> 
     );
  }
}


export default (AdminChat);
