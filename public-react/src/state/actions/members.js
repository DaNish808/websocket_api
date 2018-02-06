import { NEW_MEMBER, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

export function setMembers(members) {
  return {
    type: NEW_MEMBERS,
    payload: members
  };
}

export function newMember(member) {
  console.log(member);
  return {
    type: NEW_MEMBER,
    payload: member
  };
}

export function removeMember(name) {
  return {
    type: MEMBER_DISCONNECT,
    payload: name
  };
}