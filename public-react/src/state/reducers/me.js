import { SET_USER, TAKE_OFF } from '../constants';

const devDefaultState = {
  username: 'dev',
  userHue: 203
};


export default function me(state = devDefaultState, { type, payload }) {
  switch(type) {
    case TAKE_OFF:
    case SET_USER:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}