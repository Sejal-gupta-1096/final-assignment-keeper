const Message = require('../models/Message');
const User = require('../models/User');


// module.exports.chatSockets = function (chatServer) {
  //Requiring socket.io for chat engine
//   var io = require("socket.io")(chatServer);

//   io.on("connection", (socket) => {
//     console.log("We have a new connection");

//     socket.on("join", ({ name, room } , callback) => {
//       console.log(`${name} has joined the ${room}`);
//       User.findOne({email:room} , function(error , user){
//         if(user){
//           Chat.findOne({email:user.email}).populate('message').exec(function(error , chat){
//                 if(chat){
//                   console.log("Chat" , chat.message)
//                   callback(chat.message)
//                 }
//               })
//             }else{
//               socket.emit("message", {
//                 message: {user: "admin",
//                 text: `${name}, welcome to room ${room}.`
//               }
//               });
//         }
//       })
//       socket.join(room);
//     });

//     socket.on("sendMessage", (data, callback) => {
//       io.to(data.room).emit("message", { message : data.message});
//       callback();

//       User.findOne({email:data.room} , function(error , user){
//         if(user){
//           Message.create({
//             text : data.text,
//             user: user.name
//           } , function(error , message){
//             Chat.findOne({email:user.email} , function(error , chat){
//               if(chat){
//                 chat.message.push(message);
//                 chat.save();
//               }else{
//                 Chat.create({
//                   email : user.email
//                 } , function(error , chat){
//                   console.log(chat , message);
//                   chat.message.push(message);
//                   chat.save();
//                 })
//               }
//             })
//           })
//         }
//       })
//     });

//     socket.on("disconnect", () => {
//       console.log(`User has left the room`);
//     });
//   });
// };

module.exports.chatSockets = function(chatServer){

  //Requiring socket.io for chat engine
   var socketio = require("socket.io")(chatServer);

   //Recieving request for connecting socket and acknowledging the connection
   socketio.sockets.on("connection" , function(socket){
       console.log("new connection recieved" , socket.id);

       socket.on("disconnect" , function(){
           console.log("Socket disconnected");
       })

       //Receiving request for joining
       socket.on("join_room" , async function(data , callback){
           console.log("Joining request received" , data);

           //Joined the user to the chat room
           socket.join(data.chatroom);

           let user = await (await User.findOne({email:data.chatroom}).populate('messages')).execPopulate()
           console.log(user)
           callback(user.messages);
           //Acknowledging all members in the that chat room that new user joined
           socketio.in(data.chatroom).emit("user_joined" , data);
       })

       //Emitting receive messsage event when handled send message
       socket.on("send_message" , async function(data){
           console.log("Send message request received");
           let message = await Message.create({
             content : data.message,
             user : data.user_email
           })
           let user = await User.findOne({email : data.chatroom});
           user.messages.push(message);
           user.save();
          socketio.in(data.chatroom).emit("receive_msg" , data);
       })
       
   })

}
