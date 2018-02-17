import { 
  SET_USER, TAKE_OFF, 
  MAX_JET_VELOCITY, MIN_JET_VELOCITY
} from '../constants';

const devDefaultState = {
  username: 'dev',
  userHue: 203
};

let newJet = {
  coordX: 95, // %
  coordY: 5,  // %
  heading: 90,// deg 
  velocity: (MAX_JET_VELOCITY + MIN_JET_VELOCITY) / 2,
  health: 100,
  kills: 0
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
        userJet: newJet
      };
    default:
      return state;
  }
}