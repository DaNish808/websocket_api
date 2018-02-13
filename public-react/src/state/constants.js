/* ######## Socket.io ######## */
export const PLUG_SOCKET = 'PLUG_SOCKET';


/* ######## User info ######## */
export const SET_USER = 'SET_USER';

export const NEW_MEMBERS = 'NEW_MEMBERS';
export const NEW_MEMBER = 'NEW_MEMBER';
export const MEMBER_UPDATE = 'MEMBER_UPDATE';
export const MEMBER_DISCONNECT = 'MEMBER_DISCONNECT';


/* ######## Messaging ######## */
export const POST_ALL = 'POST_ALL';
export const RECEIVE_POST = 'RECEIVE_POST';
export const MOD_POST = 'MOD_POST';
export const UPDATE_USER_MESSAGES = 'UPDATE_USER_MESSAGES';


/* ######## Jet Game ######## */
/******* physical constants *******/
export const PROJECTILE_RADIUS = 1;
export const JET_RADIUS = 4.5;
export const MAX_JET_VELOCITY = 10;
export const MIN_JET_VELOCITY = 1;

/******* user initiated *******/
export const TAKE_OFF = 'TAKE_OFF';
export const ACCELERATE = 'ACCELERATE';
export const DECELERATE = 'DECELERATE';
export const BEAR_RIGHT = 'BEAR_RIGHT';
export const BEAR_LEFT = 'BEAR_LEFT';
export const FIRE = 'FIRE';

/******* calculated per frame *******/
export const MOVE = 'MOVE';
export const HIT = 'HIT';
export const KILL = 'KILL';
