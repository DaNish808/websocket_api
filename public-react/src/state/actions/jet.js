import { MOVE, ENEMY_MOVE } from '../constants';
import { move } from '../../utils/jetPhysics';

export function moveAll(cycleCount) {
  return (dispatch, getState) => {

    const { me: { userJet }, members, socket } = getState();

    const userHasJet = !!userJet;
    
    const enemyJets = members
      .filter(m => m.userJet)
      .map(m => ({ username: m.username, userJet: m.userJet }));
    const enemyJetsPresent = !!enemyJets;
    

    let collisions = [];

    let myNewCoords = null;
    if(userHasJet) {
      myNewCoords = move(userJet);
      if(cycleCount === 0) {
        socket.emit('my-jet-current-status', { ...userJet, ...myNewCoords });
      }
    }

    let enemyNewCoords = [];
    if(enemyJetsPresent) {
      for(let i = 0; i < enemyJets.length; i++) {
        const update = { 
          username: enemyJets[i].username,
          newCoords: move(enemyJets[i].userJet)
        };
        enemyNewCoords.push(update);
      }
    }


    if(userHasJet) {
      dispatch({
        type: MOVE,
        payload: myNewCoords
      });
    }

    if(enemyJetsPresent) {
      enemyNewCoords.forEach(enemyUpdate => dispatch({
        type: ENEMY_MOVE,
        payload: enemyUpdate
      }));
    }

  };
}