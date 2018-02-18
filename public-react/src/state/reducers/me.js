import { SET_USER, TAKE_OFF } from '../constants';
import { jetFactory } from '../../services/jetFactory';

const devDefaultState = {
  username: 'dev',
  userHue: 203
};


export default function me(state = devDefaultState, { type, payload }) {
  switch(type) {
    case SET_USER:
      return {
        ...state,
        ...payload
      };
    case TAKE_OFF:
      return {
        ...state,
        userJet: jetFactory.build()
      };
    default:
      return state;
  }
}