import { 
  JET_MAX_VELOCITY, JET_MIN_VELOCITY, JET_ACCEL_RATE, 
  JET_MAX_TURNING_RATE, JET_MIN_TURNING_RATE
} from '../state/constants';




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
    return d < 358 ? d + turningRate(v) : 0;
  };
}
export function bearRight(v) {
  return d => {
    return d > 0 ? d - turningRate(v) : 359;
  };
}



/**
 * converts a trig function taking radians to degrees
 * @param {function} trigFunc - eg. Math.cos, Math.sin, etc.
 * @param {number} angle - in degrees
 * @returns {number}
 */
const dTrig = (trigFunc, angle) => trigFunc(angle * (Math.PI / 180));

export function move({ coordX, coordY, velocity, heading }) {

  const coordXDiff = velocity * dTrig(Math.cos, heading);
  const coordYDiff = velocity * dTrig(Math.sin, heading);

  const tempX = coordX + coordXDiff;
  const tempY = coordY + coordYDiff;

  return { 
    coordX: tempX >= 0 ? tempX % 100 : 100 - tempX,
    coordY: tempY >= 0 ? tempY % 100 : 100 - tempY
  };
}



/**
 * checks to see if obj and items in otherObjs have overlap
 * @param {Object} obj - { username, coords }
 * @param {Object[]} otherObjs - [{ username, coords}]
 * @returns {Object} - { collisions, scorers }: collisions - [{ username, outcome, health }], scorers - [username]
 */
export function checkCollisions(obj, otherObjs) {



  return {
    newCollisions: [],
    newScorers: []
  };
}