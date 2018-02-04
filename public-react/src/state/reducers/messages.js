import { POST_ALL, RECEIVE_POST, MOD_POST } from '../constants';
import generateName from 'sillyname';

// const devDefaults = [
//   {
//     user: 'FIRST POSTER',
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: generateName(),
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   },
//   {
//     user: 'LAST POSTER',
//     timestamp: new Date(),
//     text: Array(Math.floor(Math.random() * 40)).fill('').map(() => generateName())
//   }
// ];

export default function messages(state = [], { type, payload }) {
  switch(type) {
    case RECEIVE_POST:
    case POST_ALL:
      return [
        ...state,
        payload
      ];
    case MOD_POST:
      return [
        ...state.slice(0, payload.i),
        {
          ...state[payload.i],
          ...payload.mods
        },
        ...state.slice(payload.i + 1)
      ];
    default:
      return state;
  }
}