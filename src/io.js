const IO = require('socket.io');

const generateName = require('sillyname');
const itemList = require('./utils/itemList');

const { MIN_JET_VELOCITY, MAX_JET_VELOCITY} = require('./constants');


let io = null;
const members = {};

let newJet = {
  pos: {
    xCoord: 95, // %
    yCoord: 5,  // %
    heading: 90,// deg 
    velocity: (MAX_JET_VELOCITY + MIN_JET_VELOCITY) / 2 
  },
  stats: {
    health: 100,
    kills: 0
  }
}


function addConnectionListener() {
  io.on('connection', socket => {

    /**************** add/distribute new member info *******************/
    let username = `${generateName()}`;
    let userHue = Math.floor(Math.random() * 256);
    let totalKills = 0;
    let killLog = [];

    socket.emit('all-members', Object.keys(members).map(username => ({
      username,
      userHue: members[username].hue
    })));
      
    socket.emit(
      'message-all', 
      {
        user: 'system',
        text: members.length === 0 ?
          `Hello ${username}, you\'re the first one here!`:
          `Hello ${username}, you joined the chat with ${itemList(Object.keys(members))}`,
        timestamp: new Date()
      }
    );
    const userData = members[username] = {
      socketId: socket.id,
      myHue: userHue,
      totalKills,
      killLog
    };
  
    sendUserUpdate(userData, username);
    console.log('client connected!');
    console.log(members);
    

    /* ################# socket listeners #################### */

    /************ member events *************/
    socket.on('reset-user', ({ username: newName, userHue: newHue }) => {
      const oldUsername = username;
      delete members[username];
      username = newName;
  
      sendUserUpdate(newHue, username, oldUsername);
  
      members[username] = {
        socketId: socket.id,
        hue: newHue
      };
    });
    
    socket.on('disconnect', () => {
      console.log('client disconnected');
      io.emit('member-disconnect', username);
      io.emit(
          'message-all', 
          {
            user: 'system',
            text: `${username} has disconnected`,
            timestamp: new Date()
          }
        );
        delete members[username];
      });
      
      function sendUserUpdate(userData, newUsername, oldUsername = null) {
        socket.emit('set-user', { newUsername, userData });
        socket.broadcast.emit('member-update', { 
          newUsername, oldUsername, userData
        });
  
        if(newUsername !== oldUsername)
          socket.broadcast.emit(
            'message-all', 
            {
              user: 'system',
              text: oldUsername ?
                `${newUsername} name changed from ${oldUsername}` :
                `${newUsername} has joined the chat`,
                timestamp: new Date()
            }
          );
      }
      
      /************** messaging events **************/
      socket.on('message-all', msg => {
        console.log(msg);
        socket.broadcast.emit('message-all', msg);
      });
  });
}



module.exports = {
  listen: server => {
    io = IO(server);
    addConnectionListener();
  }
};