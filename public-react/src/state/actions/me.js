import { SET_USER, TAKE_OFF } from '../constants';


export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}


export function commandJet(order) {
  return {
    type: order
  };
}