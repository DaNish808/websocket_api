import { 
  SET_USER, TAKE_OFF, 
  ACCELERATE, DECELERATE, BEAR_RIGHT, BEAR_LEFT, FIRE,
  MOVE,
} from '../constants';
import { accelJet, decelJet, bearLeft, bearRight } from '../../utils/jetPhysics';
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
      return updateOnlyJet(modJetProp('velocity', accelJet));
    case DECELERATE:
      return updateOnlyJet(modJetProp('velocity', decelJet));
    case BEAR_LEFT:
      return updateOnlyJet(modJetProp('heading', bearLeft));
    case BEAR_RIGHT:
      return updateOnlyJet(modJetProp('heading', bearRight));
    case FIRE:
      console.log('pew');
      return state;
      
    case MOVE:
      return updateOnlyJet(payload);

    default:
      return state;
  }
}