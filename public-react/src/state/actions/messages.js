import { POST_ALL, RECEIVE_POST, MOD_POST } from '../constants';


export function postAll(text) {

  return (dispatch, getState) => {

    const { 
      me: { username: user },
      socket
    } = getState();

    const payload = {
      user,
      text,
      timestamp: new Date(),
      firstInChain: false,
      inChain: false,
      lastInChain: false
    };

    dispatch({
      type: POST_ALL,
      payload
    });

    socket.emit('message-all', payload);
  };
}

export function receivePost(msg) {

  return (dispatch, getState) => {
    const { messages } = getState();

    const i = messages.length;
    if(i > 0) {
      const prevMsg = messages[i - 1];

      if(msg.user === prevMsg.user) {
        msg.lastInChain = true;
        
        const modifications = prevMsg.lastInChain ? 
          {
            lastInChain: false,
            inChain: true
          } :
          {
            firstInChain: true
          }
        ;

        dispatch({
          type: MOD_POST,
          payload: {
            mods: modifications, 
            i: i - 1
          }
        });
      }
    }

    dispatch({
      type: RECEIVE_POST,
      payload: msg
    });
  };
}