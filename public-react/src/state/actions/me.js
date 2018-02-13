import { SET_USER, TAKE_OFF } from '../constants';


export function setUser(user) {

  return {
    type: SET_USER,
    payload: user
  };
}


export function releaseJet(jet) {
  return {
    type: TAKE_OFF,
    payload: jet
  };
}