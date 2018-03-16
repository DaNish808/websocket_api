import { FIRE, PROJECTILE_DROP } from '../constants';


export default function projectiles(state = new Map(), { type, payload }) {
  let newState = {};
  switch(type) {
    case FIRE: 
    console.log(state);
    console.log('type:', type)
    console.log('payload:', payload)
      return state.set(payload.id, payload);
    case PROJECTILE_DROP:
      newState = state;
      newState.delete(payload);
      return newState;
    default:
      return state;
  }
}