

export default function setListeners(socket, actionCreators) {

  const { 
    setUser, setMembers, newMember, memberUpdate, 
    removeMember, updateUserMessages, receivePost,
    commandJet
  } = actionCreators;

  socket.on('set-user', user => {
    updateUserMessages(user.username);
    setUser(user);
  });

  socket.on('all-members', members => {
    setMembers(members);
  });

  socket.on('message-all', msg => {
    receivePost(msg);
  });

  socket.on('new-member', member => {
    newMember(member);
  });

  socket.on('member-update', ({ username, update, usernameIsChanged }) => {
    
    if(usernameIsChanged) {
      updateUserMessages(update.username, username);
    }
    memberUpdate({ username, update });
  });

  socket.on('steer-jet', order => {
    commandJet(order);
  });

  socket.on('jet-update', update => {
    console.log('jet-update:', update);
  });

  socket.on('member-disconnect', username => {
    removeMember(username);
  });

}