import { FIRE, PROJECTILE_DROP } from '../constants';


export function fire(projectile) {
  return {
    type: FIRE,
    payload: projectile
  };
}

export function drop(id) {
  return {
    type: PROJECTILE_DROP,
    payload: id
  };
}