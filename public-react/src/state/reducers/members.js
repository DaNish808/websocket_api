import { MEMBER_UPDATE, NEW_MEMBER, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';


export default function members(state = [], { type, payload }) {
  let i = null;
  switch(type) {
    case NEW_MEMBERS:
      return [
        ...state,
        ...payload
      ];
    case NEW_MEMBER:
      return [
        ...state,
        payload
      ];
    case MEMBER_UPDATE:
      return state.map(
        member => 
          member.username === payload.username ? 
            { ...member, ...payload.update } : 
            member
      );
    case MEMBER_DISCONNECT:
      for(i = 0; i < state.length; i++)
        if(payload === state[i].username)
          break;
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];
    default: 
      return state;
  }
}