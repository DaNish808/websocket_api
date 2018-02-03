import { NEW_MEMBER, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

export function setMembers(members) {
  return {
    type: NEW_MEMBERS,
    payload: members
  };
}