import { SET_USERNAME } from '../constants';

const devDefaultState = {
  username: 'dev'
};


export default function me(state = devDefaultState, { type, payload }) {
  switch(type) {
    case SET_USERNAME:
      return {
        username: payload
      };
    default:
      return state;
  }
}