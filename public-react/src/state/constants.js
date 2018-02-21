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
/******* game constants *******/
// time consts
export const FRAME_INTERVAL = 50; //ms
// size consts
export const PROJECTILE_RADIUS = 1;
export const JET_RADIUS = 4.5;
// jet movement consts
export const JET_MAX_VELOCITY = 3;
export const JET_MIN_VELOCITY = 1;
export const JET_MAX_TURNING_RATE = 25; //deg per frame
export const JET_MIN_TURNING_RATE = 5; //deg per frame
export const JET_ACCEL_RATE = JET_MAX_VELOCITY / 20;

/******* user initiated *******/
export const TAKE_OFF = 'TAKE_OFF';
export const ACCELERATE = 'ACCELERATE';
export const DECELERATE = 'DECELERATE';
export const BEAR_RIGHT = 'BEAR_RIGHT';
export const BEAR_LEFT = 'BEAR_LEFT';
export const FIRE = 'FIRE';

/******* enemy initiated *******/
export const ENEMY_TAKE_OFF = 'ENEMY_TAKE_OFF';
export const ENEMY_ACCELERATE = 'ENEMY_ACCELERATE';
export const ENEMY_DECELERATE = 'ENEMY_DECELERATE';
export const ENEMY_BEAR_RIGHT = 'ENEMY_BEAR_RIGHT';
export const ENEMY_BEAR_LEFT = 'ENEMY_BEAR_LEFT';
export const ENEMY_FIRE = 'ENEMY_FIRE';

/******* calculated per frame *******/
export const MOVE = 'MOVE';
export const HIT = 'HIT';
export const KILL = 'KILL';

export const ENEMY_MOVE = 'ENEMY_MOVE';
export const ENEMY_HIT = 'ENEMY_HIT';
export const ENEMY_KILL = 'ENEMY_KILL';