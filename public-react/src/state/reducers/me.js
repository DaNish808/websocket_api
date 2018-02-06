import { SET_USER } from '../constants';

const devDefaultState = {
  username: 'dev',
  myHue: 203
};


export default function me(state = devDefaultState, { type, payload }) {
  switch(type) {
    case SET_USER:
      return payload;
    default:
      return state;
  }
}