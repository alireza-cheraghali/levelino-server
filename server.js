const http=require('http');
const app=require('./app');
const PORT=process.env.PORT || 8080;
const server=http.createServer(app);
const io=require('socket.io').listen(server);
const logger=require('./utils/logger')
const {AddUser,GetUser,LeftUser}=require('./socket/chat-Users/chatUser')
io.on('connection',(socket)=>{
    socket.on('join',({username,room},callback)=>{
        const {user,error}=AddUser({id:socket.id,username,room});
        if(error) return error;
        socket.emit('message',{user:'Admin',text:`${user.username},Welcome to ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.username} has Joined`})
        socket.join(user.room)
    })
    socket.on('sendMessage',(message,callback)=>{
        const user=GetUser(socket.id);
        io.to(user.room).emit('message',{user:user.username,text:message});
    })
    socket.on('disconnect',()=>{
        const user=LeftUser(socket.id);
      if(user){
          io.to(user.room).emit('message',{user:'admin',text:`${user.username} has left.`})
    
      }
    })
})
server.listen(PORT,()=>console.log(`Server Run at ${PORT}`))