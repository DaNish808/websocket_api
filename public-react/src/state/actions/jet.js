import { MOVE, ENEMY_MOVE } from '../constants';
import { move, checkCollisions } from '../../utils/jetPhysics';

export function moveAll(cycleCount) {
  return (dispatch, getState) => {

    const { 
      me: { username: myUsername, userJet }, 
      members, socket 
    } = getState();

    const userHasJet = !!userJet;
    
    const enemyJets = members
      .filter(m => m.userJet)
      .map(m => ({ username: m.username, userJet: m.userJet }));
    const enemyJetsPresent = !!enemyJets;
    

    let collisions = [];
    let scorers = [];

    const myNewJetState = {
      username: myUsername,
      health: null,
      coords: null
    };
    if(userHasJet) {

      myNewJetState.health = userJet.health;
      myNewJetState.coords = move(userJet);

      if(cycleCount === 0) {
        socket.emit('my-jet-current-status', { ...userJet, ...myNewJetState.coords });
      }
    }

    const enemyNewJetStates = [];
    if(enemyJetsPresent) {
      for(let i = 0; i < enemyJets.length; i++) {

        const { username, userJet } = enemyJets[i];

        const update = { 
          username,
          health: userJet.health,
          coords: move(userJet)
        };

        // check for collisions against all already moved
        // const { newCollisions, newScorers } = checkCollisions(
        //   { ...update, health: userJet.health }
        // );

        enemyNewJetStates.push(update);
      }
    }


    if(userHasJet) {
      dispatch({
        type: MOVE,
        payload: myNewJetState.coords
      });
    }

    if(enemyJetsPresent) {
      enemyNewJetStates.forEach(newState => dispatch({
        type: ENEMY_MOVE,
        payload: {
          username: newState.username,
          coords: newState.coords
        }
      }));
    }

  };
}