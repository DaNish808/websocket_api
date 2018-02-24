import { 
  JET_MAX_VELOCITY, JET_MIN_VELOCITY, JET_ACCEL_RATE,
  PROJECTILE_VELOCITY, 
  JET_MAX_TURNING_RATE, JET_MIN_TURNING_RATE,
  JET_COLLISION_RADIUS, PROJECTILE_COLLISION_RADIUS,
  JET, PROJECTILE
} from '../state/constants';

import shortid from 'shortid';




/**
 * modify jet velocity within bounds
 * @param {Number} v - velocity float val
 */
export function accelJet(v) {
  return v < JET_MAX_VELOCITY ? v + JET_ACCEL_RATE : v;
}
export function decelJet(v) {
  return v > JET_MIN_VELOCITY ? v - JET_ACCEL_RATE : v;
}


const turningRate = (v) => {
  return JET_MAX_TURNING_RATE 
    - (JET_MAX_TURNING_RATE - JET_MIN_TURNING_RATE) / JET_MAX_VELOCITY 
    * v;
};
/**
 * modifies jet heading in range [0, 360)
 * @param {Number} d - heading in degrees
 */
export function bearLeft(v) {
  return d => {
    return d + turningRate(v);
  };
}
export function bearRight(v) {
  return d => {
    return d - turningRate(v);
  };
}



/**
 * converts a trig function taking radians to degrees
 * @param {function} trigFunc - eg. Math.cos, Math.sin, etc.
 * @param {number} angle - in degrees
 * @returns {number}
 */
const dTrig = (trigFunc, angle) => trigFunc(angle * (Math.PI / 180));

export function move({ coordX, coordY, velocity, heading, isProjectile }) {

  const coordXDiff = velocity * dTrig(Math.cos, heading);
  const coordYDiff = velocity * dTrig(Math.sin, heading);

  const tempX = coordX + coordXDiff;
  const tempY = coordY + coordYDiff;

  const dragCoeff = isProjectile ? 0.001 : 0.01;
  const tempV = velocity * (1 - dragCoeff);

  return { 
    coordX: tempX >= 0 ? tempX % 100 : 100 - tempX,
    coordY: tempY >= 0 ? tempY % 100 : 100 - tempY,
    velocity: tempV > JET_MIN_VELOCITY ? tempV : velocity
  };
}



const checkCircleOverlap = ({ x1, y1, r1 }, { x2, y2, r2 }) => (r1 + r2) > Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

/**
 * checks to see if obj and items in otherObjs have overlap
 * @param {Object} thisObj - { username, coords, health }
 * @param {Object[]} otherObjs - [{ username, coords, health }]
 * @returns {string[]} -collisions:[username] 
 */
export function checkCollisions(thisObj, otherObjs) {

  const newCollisions = [];
  let thisObjHadCollision = false;

  const { coordX: x1, coordY: y1 } = thisObj.coords;
  let r1, r2;
  r1 = r2 = JET_COLLISION_RADIUS; 
  const xyr1 = { x1, y1, r1 }; 

  otherObjs.forEach(otherObj => {
    const { coordX: x2, coordY: y2 } = otherObj.coords;

    const hasCollided = checkCircleOverlap(xyr1, { x2, y2, r2 });

    if(hasCollided) {
      thisObjHadCollision = true;
      newCollisions.push(otherObj.username);
    }
  });

  if(thisObjHadCollision) {
    newCollisions.push(thisObj.username);
  }

  return newCollisions;
}




export function genProjectile(user, originJet) {
  const { 
    coordX, coordY, heading, velocity
  } = originJet;

  const initDisplacement = (PROJECTILE_COLLISION_RADIUS + JET_COLLISION_RADIUS) * 2; 

  return {
    coordX: initDisplacement * dTrig(Math.cos, heading),
    coordY: initDisplacement * dTrig(Math.sin, heading),
    heading,
    velocity: velocity + PROJECTILE_VELOCITY,
    origin: { ...user },
    isProjectile: true,
    id: shortid.generate()
  };
}