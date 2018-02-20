import { SET_USER, MOVE, HIT, KILL } from '../constants';


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
