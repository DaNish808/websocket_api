import { MEMBER_UPDATE, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

export function setMembers(members) {
  return {
    type: NEW_MEMBERS,
    payload: members
  };
}

export function memberUpdate(member) {
  console.log('memberUpdate member:', member);
  return {
    type: MEMBER_UPDATE,
    payload: member
  };
}

export function removeMember(name) {
  return {
    type: MEMBER_DISCONNECT,
    payload: name
  };
}