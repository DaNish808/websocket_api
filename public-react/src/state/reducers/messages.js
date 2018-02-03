
import { POST_ALL, RECEIVE_POST } from '../constants';


export default function messages(state = [], { type, payload }) {
  switch(type) {
    case RECEIVE_POST:
    case POST_ALL:
      return [
        ...state,
        payload
      ];
    default:
      return state;
  }
}