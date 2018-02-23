import { 
  POST_ALL, RECEIVE_POST, MOD_POST, 
  RECIEVE_MSG_LOG, UPDATE_USER_MESSAGES 
} from '../constants';
import generateName from 'sillyname';


export default function messages(state = [], { type, payload }) {
  switch(type) {
    case RECIEVE_MSG_LOG:
      return [
        ...state,
        ...payload
      ];
    case RECEIVE_POST:
    case POST_ALL:
      return [
        ...state,
        payload
      ];
    case MOD_POST:
      return [
        ...state.slice(0, payload.i),
        {
          ...state[payload.i],
          ...payload.mods
        },
        ...state.slice(payload.i + 1)
      ];
    case UPDATE_USER_MESSAGES:  // when user changes name or color
      return state.map(msg => {
        if(payload.oldUsername === msg.user)
          return {
            ...msg,
            user: payload.newUsername
          };
        return msg;
      });
    default:
      return state;
  }
}