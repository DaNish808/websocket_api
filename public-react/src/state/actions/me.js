import { SET_USER, TAKE_OFF } from '../constants';


export function setUser({ newUsername, userData: { myHue, totalKills, killLog } }) {

  return {
    type: SET_USER,
    payload: {
      username: newUsername,
      myHue,
      totalKills,
      killLog
    }
  };
}


export function releaseJet(jet) {
  return {
    type: TAKE_OFF,
    payload: jet
  };
}