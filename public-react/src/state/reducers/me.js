import { 
  SET_USER, TAKE_OFF, 
  ACCELERATE, DECELERATE, BEAR_RIGHT, BEAR_LEFT, FIRE,
  MAX_JET_VELOCITY, MIN_JET_VELOCITY,
  JET_ACCEL_RATE, JET_TURNING_RATE
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
        v => v < MAX_JET_VELOCITY ? v + JET_ACCEL_RATE : v
      ));
    case DECELERATE:
      return updateOnlyJet(modJetProp('velocity', 
        v => v > MIN_JET_VELOCITY ? v - JET_ACCEL_RATE : v
      ));
    case BEAR_LEFT:
      return updateOnlyJet(modJetProp('heading', 
        d => d < 358 ? d + JET_TURNING_RATE : 0
      ));
    case BEAR_RIGHT:
      return updateOnlyJet(modJetProp('heading', 
        d => d > 0 ? d - JET_TURNING_RATE : 359
      ));
    default:
      return state;
  }
}