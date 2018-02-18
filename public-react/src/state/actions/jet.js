export function moveAll() {
  return (dispatch, getState) => {

    const { me: { userJet } } = getState();
    // console.log(`v: ${userJet.velocity}  -  d: ${userJet.heading}`);
  };
}