const IO = require('socket.io');

const faker = require('faker');
const itemList = require('./utils/itemList');


let io = null;
const members = {};

function addConnectionListener() {
  io.on('connection', socket => {
    let username = `${faker.internet.userName()}`;
    socket.emit(
      'message-all', 
      {
        user: 'admin',
        text: members.length === 0 ?
          `Hello ${username}, you\'re the first one here!`:
          `Hello ${username}, you joined the chat with ${itemList(Object.keys(members))}`,
        timestamp: new Date()
      }
    )
    members[username] = socket.id;
  
    sendUserUpdate(username);
    console.log('client connected!');
    console.log(members);
    

    /*****  *****/
    socket.on('reset-username', newName => {
      const oldUsername = username;
      delete members[username];
      username = newName;
  
      sendUserUpdate(username, oldUsername);
  
      members[username] = socket.id;
    });
  
    socket.on('message-all', msg => {
      console.log(msg);
      socket.broadcast.emit('message-all', msg);
    });
    
    socket.on('disconnect', () => {
      console.log('client disconnected');
      socket.broadcast.emit(
        'message-all', 
        {
          user: 'admin',
          text: `${username} has disconnected`,
          timestamp: new Date()
        }
      );
      delete members[username];
    });
    

    /***** broadcast emitters for member updates *****/
    function sendUserUpdate(newUsername, oldUsername = null) {
      socket.emit('set-username', { newUsername });
      socket.broadcast.emit('member-update', { 
        newUsername, oldUsername 
      });
      socket.broadcast.emit(
        'message-all', 
        {
          user: 'admin',
          text: oldUsername ?
            `${newUsername} name changed from ${oldUsername}` :
            `${newUsername} has joined the chat`,
          timestamp: new Date()
        }
      );
    }
  });
}



module.exports = {
  listen: server => {
    io = IO(server);
    addConnectionListener();
  }
};