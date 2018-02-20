import { 
  JET_MAX_VELOCITY, JET_MIN_VELOCITY,
  JET_ACCEL_RATE, JET_TURNING_RATE
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

/**
 * modifies jet heading in range [0, 360)
 * @param {Number} d - heading in degrees
 */
export function bearLeft(d) {
  return d < 358 ? d + JET_TURNING_RATE : 0;
}
export function bearRight(d) {
  return d > 0 ? d - JET_TURNING_RATE : 359;
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
    coordX: tempX >= 0 ? tempX % 360 : 360 - tempX,
    coordY: tempY >= 0 ? tempY % 360 : 360 - tempY
  };
}