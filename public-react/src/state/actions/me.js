import { SET_USER } from '../constants';


export function setUser({ newUsername, userHue }) {
  console.log('in setUser action');
  console.log(newUsername);
  console.log(userHue);
  return {
    type: SET_USER,
    payload: {
      username: newUsername,
      myHue: userHue
    }
  };
}