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