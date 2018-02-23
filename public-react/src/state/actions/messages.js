import { 
  POST_ALL, RECEIVE_POST, MOD_POST,
  RECIEVE_MSG_LOG, UPDATE_USER_MESSAGES 
} from '../constants';


export function updateUserMessages(newUsername, oldUsername = null) {

  return (dispatch, getState) => {
    if(oldUsername === null) oldUsername = getState().me.username;

    dispatch({
      type: UPDATE_USER_MESSAGES,
      payload: {
        newUsername,
        oldUsername
      }
    });
  };
}

export function receiveMsgLog(log) {
  return {
    type: RECIEVE_MSG_LOG,
    payload: log
  };
}

export function postAll(text) {

  return (dispatch, getState) => {

    const { 
      me: { username: user },
      messages,
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

    forgeChain(payload, messages, dispatch);

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

    forgeChain(msg, messages, dispatch);

    dispatch({
      type: RECEIVE_POST,
      payload: msg
    });
  };
}


function forgeChain(msg, messages, dispatch) {
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
}