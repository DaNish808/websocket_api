$(() => {
  const socket = io();
  
  $('form').submit(e => {
    inputEl = e.target.message;
    socket.emit('message', inputEl.value);
    inputEl.value = '';
    return false;
  });

  socket.on('message-all', msg => {
    $('#messages').append($('<li>').text(msg));
  })
});
