import { NEW_MEMBER, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

const devDefault = [
  'Prairiehiss Wolf',
  'Lemonslayer Roach',
  'Dullchest Crow',
  'Pieskull Fin',
  'Plumeedge Parrot',
  'Mazechin Stag',
  'Fieldcharger Wasp',
  'Alpinesoarer Bone',
  'Limemark Otter',
  'Shadowjester Kangaroo',
  'Malachitekiller Seeker',
  'Woodglazer Dolphin',
  'Junglegoose Forger',
  'Nickellasher Voice',
  'Peridotserpent Jester',
  'Grayhyena Death',
  'Legendvenom Monkey',
  'Flickerquester Thunder',
  'Laceprince Fighter',
  'Whitescarer Slave',
  'Heavydog Spirit',
  'Purplestag Slicer',
  'Lightelf Vole',
  'Phasedevourer Devourer',
  'Sunsong Soarer',
  'Glenwasp Stinger',
  'Bristlestag Deer',
  'Saltshark Kicker'
];

export default function members(state = devDefault || [], { type, payload }) {
  let i = null;
  switch(type) {
    case NEW_MEMBER:
      return [
        ...state,
        payload
      ];
    case NEW_MEMBERS:
      return [
        ...state,
        ...payload
      ];
    case MEMBER_DISCONNECT:
      i = state.indexOf(payload);
      console.log(`reducer: ${i}; ${payload}`);
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];
    default: 
      return state;
  }
}