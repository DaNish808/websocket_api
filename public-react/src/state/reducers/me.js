import { 
  SET_USER, TAKE_OFF, 
  ACCELERATE, DECELERATE, BEAR_RIGHT, BEAR_LEFT, FIRE,
  MAX_JET_VELOCITY, MIN_JET_VELOCITY
} from '../constants';
import { jetFactory } from '../../services/jetFactory';

const devDefaultState = {
  username: 'dev',
  userHue: 203
};


export default function me(state = devDefaultState, { type, payload }) {
  
  const updateOnlyJet = updates => ({
    ...state,
    userJet: {
      ...state.userJet,
      ...updates
    }
  });
  const modJetProp = (prop, mod) => ({
    [prop]: mod(state.userJet[prop])
  });

  switch(type) {
    case SET_USER:
      return {
        ...state,
        ...payload
      };
    case TAKE_OFF:
      return updateOnlyJet(jetFactory.build());
    case ACCELERATE:
      return updateOnlyJet(modJetProp('velocity', 
        v => v < MAX_JET_VELOCITY ? v + MAX_JET_VELOCITY / 20 : v
      ));
    case DECELERATE:
      return updateOnlyJet(modJetProp('velocity', 
        v => v > MIN_JET_VELOCITY ? v - MAX_JET_VELOCITY / 20 : v
      ));
    case BEAR_LEFT:
      return updateOnlyJet(modJetProp('heading', 
        d => d < 359 ? d + 1 : 0
      ));
    case BEAR_RIGHT:
      return updateOnlyJet(modJetProp('heading', 
        d => d > 0 ? d - 1 : 360
      ));
    default:
      return state;
  }
}