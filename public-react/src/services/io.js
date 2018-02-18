

export default function setListeners(socket, actionCreators) {

  const { 
    setUser, setMembers, newMember, memberUpdate, 
    removeMember, updateUserMessages, receivePost,
    commandJet
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


  /***** jet game *****/
  socket.on('steer-jet', order => {
    commandJet(order);
    
  });

  socket.on('enemy-update', update => {
    console.log('enemy-update:', update);
  });

}