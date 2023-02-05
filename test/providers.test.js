const Provider = require('../src/providers')

test('create user', () => {
    var p=new Provider();
    p.createUser("test","");

    expect(p.db.users).toHaveLength(1);
});



test('create user', () => {
    var p=new Provider();
    p.createUser("test","");
    p.createUser("test2","");
    expect(p.db.users).toHaveLength(2);

    expect(p.db.users[1].name).toBe("test2")
});


test('create chat', () => {
    var p=new Provider();
    var user1= p.createUser("test","");
    var user2=p.createUser("test2","");
    var chat=p.createChat(user1.id, user2.id);
    expect(p.db.users).toHaveLength(2);
    expect(p.db.chats).toHaveLength(1);
    expect(p.db.chats[0].user1_id).toBe(user1.id);
    expect(p.db.chats[0].user2_id).toBe(user2.id)
});


test('create message', () => {
    var p=new Provider();

    var user1= p.createUser("test","");
    var user2=p.createUser("test2","");
    var user3=p.createUser("test3","");

    var chat=p.createChat(user1.id, user2.id);    
    p.postMessage(user1.id, chat.id, "message");
    p.postMessage(user2.id, chat.id, "answer");

    var chat2= p.createChat(user2.id, user3.id);
    p.postMessage(user2.id, chat2.id, "message");
    p.postMessage(user3.id, chat2.id, "answer");

    var getMessages= p.getMessages(chat.id);
    var getMessages2= p.getMessages(chat2.id);

    expect(getMessages).toHaveLength(2);
    expect(getMessages2).toHaveLength(2);

    expect(p.db.messages).toHaveLength(4);
});

test ("delete chat", ()=>{
    var p=new Provider();

    var user1= p.createUser("test","");
    var user2=p.createUser("test2","");
    var user3=p.createUser("test3","");

    var chat=p.createChat(user1.id, user2.id);    
    p.postMessage(user1.id, chat.id, "message");
    p.postMessage(user2.id, chat.id, "answer");

    var chat2= p.createChat(user2.id, user3.id);
    p.postMessage(user2.id, chat2.id, "message");
    p.postMessage(user3.id, chat2.id, "answer");

    p.deleteChat(chat.id);
   
    var getMessages= p.getMessages(chat.id);
    var getMessages2= p.getMessages(chat2.id);

    expect(getMessages).toHaveLength(0);
    expect(getMessages2).toHaveLength(2);

    expect(p.db.messages).toHaveLength(2);
    expect(p.db.chats).toHaveLength(1);
})