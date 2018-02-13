

export default function setListeners(socket, actionCreators) {

  const {
    setUser, setMembers, newMember,
    memberUpdate, removeMember, updateUserMessages,
    plugSocket, receivePost
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

  socket.on('jet-update', orders => {
    console.log('jet-update:', orders);
  });

  socket.on('member-disconnect', username => {
    removeMember(username);
  });

}