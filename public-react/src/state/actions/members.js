import { NEW_MEMBER, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

export function setMembers(members) {
  return {
    type: NEW_MEMBERS,
    payload: members
  };
}

export function newMember(name) {
  return {
    type: NEW_MEMBER,
    payload: name
  };
}

export function removeMember(name) {
  console.log('action:', name)
  return {
    type: MEMBER_DISCONNECT,
    payload: name
  };
}