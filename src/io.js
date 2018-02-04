const IO = require('socket.io');

const generateName = require('sillyname');
const itemList = require('./utils/itemList');


let io = null;
const members = {};


function addConnectionListener() {
  io.on('connection', socket => {
    let username = `${generateName()}`;
    let userHue = Math.floor(Math.random() * 256);

    socket.emit('all-members', Object.keys(members).map(username => ({
      username,
      userHue: members[username].hue
    })));
      
    socket.emit(
      'message-all', 
      {
        user: 'system',
        hue: '#ddd',
        text: members.length === 0 ?
          `Hello ${username}, you\'re the first one here!`:
          `Hello ${username}, you joined the chat with ${itemList(Object.keys(members))}`,
        timestamp: new Date()
      }
    );
    members[username] = {
      socketId: socket.id,
      hue: userHue
    };
  
    sendUserUpdate(userHue, username);
    console.log('client connected!');
    console.log(members);
    

    /***** socket listeners *****/
    socket.on('reset-username', newName => {
      const oldUsername = username;
      delete members[username];
      username = newName;
  
      sendUserUpdate(userHue, username, oldUsername);
  
      members[username] = {
        socketId: socket.id,
        hue: userHue
      };
    });
  
    socket.on('message-all', msg => {
      console.log(msg);
      socket.broadcast.emit('message-all', msg);
    });
    
    socket.on('disconnect', () => {
      console.log('client disconnected');
      io.emit('member-disconnect', username);
      io.emit(
        'message-all', 
        {
          user: 'system',
          hue: '#ddd',
          text: `${username} has disconnected`,
          timestamp: new Date()
        }
      );
      delete members[username];
    });
    

    /***** broadcast emitters for member updates *****/
    function sendUserUpdate(userHue, newUsername, oldUsername = null) {
      socket.emit('set-user', { newUsername, userHue });
      socket.broadcast.emit('member-update', { 
        newUsername, oldUsername, userHue
      });
      socket.broadcast.emit(
        'message-all', 
        {
          user: 'system',
          hue: '#ddd',
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