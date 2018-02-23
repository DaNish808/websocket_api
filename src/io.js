const IO = require('socket.io');

const generateName = require('sillyname');
const itemList = require('./utils/itemList');

const { MIN_JET_VELOCITY, MAX_JET_VELOCITY} = require('./constants');


let io = null;

const members = {};
let recentMsgLog = [];


function addConnectionListener() {
  io.on('connection', socket => {

    /**************** add/distribute new member info *******************/

    const generateShortName = () => {
      const name = generateName();
      return name.length < 15 ? name : name.split(' ')[0];
    }

    let username = `${generateShortName()}`;
    let userHue = Math.floor(Math.random() * 256);
    const jetJunkyard = [];
    const killLog = [];

    socket.emit('all-members', Object.keys(members).map(username => ({
      username,
      ...members[username]
    })));

    socket.emit('recent-msg-log', recentMsgLog);
      
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
      jetJunkyard,
      killLog
    };
  
    notifyNewUser();
    


    /* ################# socket listeners #################### */

    /************ member events *************/
    socket.on('update-user', update => {
      const oldUsername = username;
      delete members[username];
      username = update.username;

      sendUserUpdate(update, username, oldUsername);
  
      members[username] = {
        // socketId: socket.id,
        ...update
      };
    });
    
    socket.on('disconnect', () => {

      io.emit('member-disconnect', username);
      const msg = {
        user: 'system',
        text: `${username} has disconnected`,
        timestamp: new Date()
      };
      io.emit('message-all', msg);

      logMsg(msg);
      delete members[username];
    });
    
    
    function notifyNewUser() {
      const newUserPackage = {
        username, ...members[username]
      }
      socket.emit('set-user', newUserPackage);
      socket.broadcast.emit('new-member', newUserPackage);
      broadcastSysMsg(`${username} has joined the chat`);
    }

    function sendUserUpdate(update, newUsername, oldUsername = null) {

      socket.emit('set-user', update);

      socket.broadcast.emit('member-update', 
        { username: oldUsername || username, update, usernameIsChanged: !!oldUsername }
      );

      if(newUsername !== oldUsername) {
        broadcastSysMsg(`${oldUsername} is now ${newUsername}`);
      }
    }
    
    function broadcastSysMsg(message) {
      const msg = {
        user: 'system',
        text: message,
        timestamp: new Date()
      }
      socket.broadcast.emit('message-all', msg);

      logMsg(msg);
    }
    

    /************** messaging events **************/
    socket.on('message-all', msg => {
      socket.broadcast.emit('message-all', msg);
      logMsg(msg);
    });

    function logMsg(msg) {

      if(recentMsgLog.length < 100) {
        recentMsgLog.push(msg);
      }
      else {
        recentMsgLog = [
          ...recentMsgLog.slice(89),
          msg
        ];
      }

      console.log({
        user: msg.user,
        text: msg.text,
        timestamp: msg.timestamp
      });
    }

  
    /************** game events **************/

    socket.on('my-jet-current-status', jetUpdate => {
      socket.broadcast.emit('enemy-update', { username, jetUpdate });
    })

    socket.on('jet-order', orders => {
      socket.emit('steer-jet', orders);
      socket.broadcast.emit('enemy-orders', { username, orders });
    })

    socket.on('jet-status-action', action => {

      // if the user targeted has been hit by the same action in the last 100 ms...
      if(members[action.payload][action.type]) {
        io.emit('jet-status-action', action);
      }
      else {
        members[action.payload][action.type] = true;

        setTimeout(() => {
          members[action.payload][action.type] = false
        }, 100)
      }
    });

  });
}



module.exports = {
  listen: server => {
    io = IO(server);
    addConnectionListener();
  }
};