import { NEW_MEMBER, MEMBER_UPDATE, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

export function setMembers(members) {
  return {
    type: NEW_MEMBERS,
    payload: members
  };
}

export function newMember(member) {
  return {
    type: NEW_MEMBER,
    payload: member
  };
}

export function memberUpdate(updatePackage) {
  return {
    type: MEMBER_UPDATE,
    payload: updatePackage
  };
}

export function removeMember(name) {
  return {
    type: MEMBER_DISCONNECT,
    payload: name
  };
}


export function updateEnemyJet({ username, orders }) {
  if(/^BEAR_(LEFT|RIGHT)/.test(orders)) {
    return (dispatch, getState) => {
      const currentVelocity = getState()
        .members.find(member => member.username === username)
        .userJet.velocity;
      dispatch({
        type: 'ENEMY_' + orders,
        payload: { username, currentVelocity }
      });
    };
  }
  else {
    return {
      type: 'ENEMY_' + orders,
      payload: { username }
    };
  }
}
