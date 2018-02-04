import { SET_USERNAME } from '../constants';


export function setUsername({ newUsername, userHue }) {
  return {
    type: SET_USERNAME,
    payload: {
      username: newUsername,
      myHue: userHue
    }
  };
}