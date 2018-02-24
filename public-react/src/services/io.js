import { KILL } from "../state/constants";

export default function setListeners(socket, actionCreators) {

  const { 
    setUser, fire,
    setMembers, newMember, memberUpdate, removeMember, 
    updateUserMessages, receivePost, receiveMsgLog,
    commandJet, transmitEnemyOrders, updateEnemyJet, updateJetStatus,
    resetKeys
  } = actionCreators;
  

  /***** user *****/
  socket.on('set-user', user => {
    updateUserMessages(user.username);
    setUser(user);
  });


  /***** members *****/
  socket.on('new-member', member => {
    newMember(member);
  });

  socket.on('member-update', ({ username, update, usernameIsChanged }) => {
    
    if(usernameIsChanged) {
      updateUserMessages(update.username, username);
    }
    memberUpdate({ username, update });
  });

  socket.on('member-disconnect', username => {
    removeMember(username);
  });

  socket.on('all-members', members => {
    setMembers(members);
  });


  /***** chat *****/
  socket.on('message-all', msg => {
    receivePost(msg);
  });

  socket.on('recent-msg-log', log => {
    receiveMsgLog(log);
  });


  /***** jet game *****/
  socket.on('steer-jet', orders => {

    if(typeof orders === 'string') 
      commandJet(orders);

    else // if array
      orders.forEach(o => commandJet(o));
  });

  socket.on('enemy-orders', command => {
    if(typeof command.orders === 'string')
      transmitEnemyOrders(command);

    else { // if array
      const { username, orders } = command;
      orders.forEach(o => {
        transmitEnemyOrders({ username, orders: o });
      });
    }
  });

  socket.on('enemy-update', update => {
    updateEnemyJet(update);
  });
  
  socket.on('jet-status-action', action => {
    updateJetStatus(action);

    if(action.type === KILL) resetKeys();
  });

  socket.on('shoot', projectile => {
    fire(projectile);
    console.log(projectile);
  });
}