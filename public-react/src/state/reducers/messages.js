
import { POST_ALL, RECEIVE_POST } from '../constants';

const devDefaultState = [
  {
    user: 'mie',
    text: 'hello!',
    timestamp: new Date()
  },
  {
    user: 'dave',
    text: 'hi!',
    timestamp: new Date()
  },
  {
    user: 'dev',
    text: 'hello world!',
    timestamp: new Date()
  },
];

export default function messages(state = devDefaultState, { type, payload }) {
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