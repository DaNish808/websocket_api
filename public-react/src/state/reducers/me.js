
const devDefaultState = {
  username: 'dev'
};


export default function me(state = devDefaultState, { type, payload }) {
  switch(type) {
    default:
      return state;
  }
}