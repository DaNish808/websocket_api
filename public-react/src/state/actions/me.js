import { SET_USERNAME } from '../constants';


export function setUsername(payload) {
  return {
    type: SET_USERNAME,
    payload
  };
}