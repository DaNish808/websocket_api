import { POST_ALL } from '../constants';

export function postAll(text) {

  return (dispatch, getState) => {

    const { 
      me: { username: user },
      socket
    } = getState();

    const payload = {
      user,
      text,
      timestamp: new Date()
    };

    dispatch({
      type: POST_ALL,
      payload
    });

    socket.emit('message-all', payload);
  };
}