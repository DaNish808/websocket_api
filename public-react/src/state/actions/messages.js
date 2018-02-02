import { POST_ALL, RECEIVE_POST } from '../constants';


export function receivePost(msg) {
  return {
    type: RECEIVE_POST,
    payload: msg
  };
}

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