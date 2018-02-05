import io from 'socket.io-client';
import { PLUG_SOCKET } from '../constants';


export function plugSocket(cb) {

  return (dispatch, getState) => {

    return new Promise(async resolve => {

      const socket = await io();
        
      dispatch({
        type: PLUG_SOCKET,
        payload: socket
      });
    
      resolve('socket available in store');
    });
  };
}