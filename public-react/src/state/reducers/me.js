import { SET_USER, TAKE_OFF } from '../constants';

const devDefaultState = {
  username: 'dev',
  myHue: 203
};


export default function me(state = devDefaultState, { type, payload }) {
  switch(type) {
    case SET_USER:
      return {
        ...state,
        ...payload
      };
    case TAKE_OFF:
    default:
      return state;
  }
}