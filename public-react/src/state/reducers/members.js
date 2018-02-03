import { NEW_MEMBER, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

export default function members(state = [], { type, payload }) {
  let i = null;
  switch(type) {
    case NEW_MEMBER:
      return [
        ...state,
        payload
      ];
    case NEW_MEMBERS:
      return [
        ...state,
        ...payload
      ];
    case MEMBER_DISCONNECT:
      i = state.indexOf(payload);
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];
    default: 
      return state;
  }
}