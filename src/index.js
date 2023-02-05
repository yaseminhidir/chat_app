const express = require('express')
const app = express()

const Provider = require('./providers')
var p=new Provider();


var home=function (req, res) {
  res.send('Hello World')
}

app.get('/', home)

app.post('/createUser', (req,res)=>{
    var username=req.body.name;
    var profile_pic=req.body.profile_pic;
    var users=p.createUser(username,profile_pic);
    res.send(users)
} )

app.get('/getUsers/:user_id', (req,res)=>{
   var user_id= req.params.user_id;
   var users=p.getUsers(user_id);
   res.send(users)
})

app.get('/getChatsByUser/:user_id', (req,res)=>{
    var user_id= req.params.user_id;
    var chats=p.getChatsByUser(user_id);
    res.send(chats)
 })
 
app.get('getMessages/:chat_id', (req,res)=>{
    var chat_id=req.params.chat_id;
    var messages=p.getMessages(chat_id);
    res.send(messages)
})


app.post('/postMessage', (req, res) =>{
   
    var user_id=req.body.user_id;
    var chat_id=req.body.chat_id;
    var message=req.body.message;
    var message=p.postMessage(user_id,chat_id,message)
    res.send(message)
})


app.post('/deleteMessage/:message_id', (req,res) => {
    var message_id=req.params.message_id;
    var messages=p.deleteMessage(message_id);
    res.send(messages);
})

app.post('/createChat', (req,res)=>{
    var user1_id = req.body.user1_id;
    var user2_id= req.body.user2_id;
    var chat=p.createChat(user1_id, user2_id);
    res.send(chat)
})

app.post('/deleteChat/:chat_id', (req,res) =>{
    var chat_id=req.params.chat_id;
    var chats=p.deleteChat(chat_id);
    res.send(chats)
})


app.listen(3000)