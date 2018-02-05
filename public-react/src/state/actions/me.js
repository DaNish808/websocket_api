import { SET_USER } from '../constants';


export function setUser({ newUsername, userHue }) {
  return {
    type: SET_USER,
    payload: {
      username: newUsername,
      myHue: userHue
    }
  };
}