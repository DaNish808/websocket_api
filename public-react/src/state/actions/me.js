import { SET_USER, MOVE, HIT, KILL } from '../constants';


export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}


export function commandJet(order) {
  if(/^BEAR_(LEFT|RIGHT)/.test(order)) {
    return (dispatch, getState) => {
      const currentVelocity = getState().me.userJet.velocity;
      dispatch({
        type: order,
        payload: { currentVelocity }
      });
    };
  }
  else {
    return {
      type: order
    };
  }
}
