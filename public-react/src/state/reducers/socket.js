import { PLUG_SOCKET } from '../constants';

export default function socket(state = null, {type, payload}) {
  switch(type) {
    case PLUG_SOCKET:
      return payload;
    default:
      return state;
  }
}