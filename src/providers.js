
class Provider{
    constructor(){
        this.db={
            users:[],
            chats:[],
            messages:[]
        };
    }

   
    
    createUser=(name, profile_pic)=>{
        var ids= this.db.users.map(x=>x.id);
        var max_id= Math.max(ids);
       
        var user={
           id:max_id+1 , name, profile_pic
        }
        this.db.users.push(user);
        return user
    }
    
    getUsers=(user_id)=>{
        return this.db.users;
    }
    
    getChatsByUser=(user_id)=>{
        var chats=this.db.chats.filter(x=>x.user1_id === user_id || x.user2_id===user_id);
        return chats
    }
    
    getMessages=(chat_id) =>{
        var messages=this.db.messages.filter(x=>x.chat_id === chat_id);
        return messages
    }
    
   postMessage=(user_id, chat_id, message) =>{
        var ids= this.db.messages.map(x=>x.id);
        var max_id= Math.max(ids);
       
        var message={
            id:max_id + 1,
            user_id,
            chat_id,
            message
        }
        this.db.messages.push(message);
        return message
    }
    
    deleteMessage=(message_id)=>{
        this.db.messages= this.db.messages.filter(x=> x.id != message_id);
        return this.db.messages
    }
    
    createChat=(user1_id, user2_id)=>{
        var ids= this.db.chats.map(x=>x.id);
        var max_id= Math.max(ids);
      
    
        var chat= {
            id:max_id + 1,
            user1_id,
            user2_id
        }
    
        this.db.chats.push(chat);
        return chat;
    }
    
    
    deleteChat=(chat_id)=>{
        this.db.chats=this.db.chats.filter(x=>x.id != chat_id);
        this.db.messages=this.db.messages.filter(x=>x.chat_id != chat_id);
        return {
            chats: this.db.chats,
            messages:this.db.messages
        }
    }
    
    
}

module.exports=Provider;