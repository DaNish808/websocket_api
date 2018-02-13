const IO = require('socket.io');

const generateName = require('sillyname');
const itemList = require('./utils/itemList');

const { MIN_JET_VELOCITY, MAX_JET_VELOCITY} = require('./constants');


let io = null;
const members = {};

let newJet = {
  coordX: 95, // %
  coordY: 5,  // %
  heading: 90,// deg 
  velocity: (MAX_JET_VELOCITY + MIN_JET_VELOCITY) / 2,
  health: 100,
  kills: 0
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
      ...members[username]
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
      // socketId: socket.id,
      userHue,
      totalKills,
      killLog
    };
  
    notifyNewUser();
    console.log('client connected!');
    console.log(members);
    

    /* ################# socket listeners #################### */

    /************ member events *************/
    socket.on('update-user', update => {
      const oldUsername = username;
      delete members[username];
      delete update.username;
      username = update.username;
  
      sendUserUpdate(update, username, oldUsername);
  
      members[username] = {
        // socketId: socket.id,
        ...update
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
      
      
      function notifyNewUser() {
        const newUserPackage = {
          username, userHue, totalKills, killLog
        }
        socket.emit('set-user', newUserPackage);
        console.log('notifyNewUser:', username);
        socket.broadcast.emit('new-member', newUserPackage);
        broadcastSysMsg(`${username} has joined the chat`);
      }

      function sendUserUpdate(update, newUsername, oldUsername = null) {
        console.log('IN SET USER UPDATE ################################')
        socket.emit('set-user', { newUsername, update });
        socket.broadcast.emit('member-update', { 
          newUsername, oldUsername, update
        });
  
        if(newUsername !== oldUsername)
          broadcastSysMsg(`${oldUsername} is now ${newUsername}`)
      }
      
      function broadcastSysMsg(message) {
        socket.broadcast.emit(
          'message-all', 
          {
            user: 'system',
            text: message,
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