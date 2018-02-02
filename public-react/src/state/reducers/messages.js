
const devDefaultState = [
  {
    user: 'mie',
    text: 'hello!',
    timestamp: new Date()
  },
  {
    user: 'dave',
    text: 'hi!',
    timestamp: new Date()
  },
  {
    user: 'dev',
    text: 'hello world!',
    timestamp: new Date()
  },
];

export default function messages(state = devDefaultState, { type, payload }) {
  switch(type) {
    default:
      return state;
  }
}