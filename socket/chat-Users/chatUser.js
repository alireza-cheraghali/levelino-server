const usersChat=[];
const AddUser=({username,room,id})=>{
username=username.trim().toLowerCase();
room=room.trim().toLowerCase();
const userExist=usersChat.find((user)=>user.username==username);
if(userExist){
    return {error:'User Has Exist'}
}
const user={username,room,id}
usersChat.push(user);
return {user}
}
const GetUser=(id)=>usersChat.find((user)=>user.id===id)
const LeftUser=(id)=>{
   const user=usersChat.findIndex((user)=>user.id===id)
   if(user!==-1){
       return usersChat.splice(user,1)[0];
   }
}
module.exports={AddUser,GetUser,LeftUser}