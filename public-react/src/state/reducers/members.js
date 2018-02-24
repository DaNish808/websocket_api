import { 
  MEMBER_UPDATE, NEW_MEMBER, NEW_MEMBERS, MEMBER_DISCONNECT,
  ENEMY_TAKE_OFF, ENEMY_ACCELERATE, ENEMY_DECELERATE, 
  ENEMY_BEAR_RIGHT, ENEMY_BEAR_LEFT, ENEMY_FIRE,
  ENEMY_MOVE, ENEMY_UPDATE, ENEMY_KILL
} from '../constants';
import { accelJet, decelJet, bearLeft, bearRight } from '../../utils/jetPhysics';
import { jetFactory } from '../../services/jetFactory';



export default function members(state = [], { type, payload }) {

  /**
   * modify a single member
   * @param {string} username - user to target
   * @param {updateOneCallback} mod - callback that modifies the member
   */
  const updateOne = (targetUsername, mod) => {
    return state.map(member => {
      return member.username === targetUsername ?
        mod(member) : 
        member;
    });
  };
  /**
   * modify a single member
   * @callback updateOneCallback
   * @param {Object} member - member matching the given username
   * @returns {*} the updated member 
   */

  /**
   * update a member's jet
   * @param {Object} member - member to be modified
   * @param {updateJetCallback} updates - callback that modifies the member's jet
   */
  const updateJet = (member, updates) => {

    return {
      ...member,
      userJet: {
        ...member.userJet,
        ...updates
      }
    };
  };
  /**
   * modifies the jet
   * @callback updateJetCallback
   * @param {Object} member
   * @returns {*} the member with updated jet 
   */
  const modJetProp = (jet, prop, mod) => (jet && {
    [prop]: mod(jet[prop])
  });

  const updateSingleUsersJet = (targetUsername, update) => {
    return updateOne(targetUsername,
      member => updateJet(member, update)
    );
  };

  const modSingleUsersJetProp = (targetUsername, prop, mod) => 
    updateOne(targetUsername, 
      member => updateJet(member, 
        modJetProp(member.userJet, prop, mod)
      )
    );


  let i = null;

  switch(type) {
    case NEW_MEMBERS:
      return [
        ...state,
        ...payload
      ];
    case NEW_MEMBER:
      return [
        ...state,
        payload
      ];
    case MEMBER_UPDATE:
      return updateOne(payload.username, member => ({
        ...member,
        ...payload.update
      }));
    case MEMBER_DISCONNECT:
      for(i = 0; i < state.length; i++)
        if(payload === state[i].username)
          break;
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];

    case ENEMY_TAKE_OFF:
      return updateSingleUsersJet(payload.username, jetFactory.build());
    case ENEMY_ACCELERATE:
      return modSingleUsersJetProp(payload.username, 'velocity', accelJet);
    case ENEMY_DECELERATE:
      return modSingleUsersJetProp(payload.username, 'velocity', decelJet);  
    case ENEMY_BEAR_LEFT:
      return modSingleUsersJetProp(payload.username, 'heading', bearLeft(payload.currentVelocity));  
    case ENEMY_BEAR_RIGHT:
      return modSingleUsersJetProp(payload.username, 'heading', bearRight(payload.currentVelocity));  

    case ENEMY_MOVE:
      return updateSingleUsersJet(payload.username, payload.coords);
    case ENEMY_UPDATE:
      return updateSingleUsersJet(payload.username, payload.jetUpdate);
    case ENEMY_KILL:
      return updateOne(payload, member => ({
        ...member,
        jetJunkyard: [ ...member.jetJunkyard, member.userJet ],
        userJet: null,
      }));

    default: 
      return state;
  }
}