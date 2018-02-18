export function moveAll() {
  return (dispatch, getState) => {

    const { me: { userJet } } = getState();
    console.log('my jet:', userJet);
  };
}