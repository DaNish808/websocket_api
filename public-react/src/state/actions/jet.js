import { MOVE, ENEMY_MOVE } from '../constants';
import { move } from '../../utils/jetPhysics';

export function moveAll() {
  return (dispatch, getState) => {

    const { me: { userJet }, members } = getState();

    const userHasJet = !!userJet;
    
    const enemyJets = members
      .filter(m => m.userJet)
      .map(m => ({ username: m.username, userJet: m.userJet }));
    const enemyJetsPresent = !!enemyJets;
    

    const myNewCoords = userHasJet && 
      move(userJet);

    const enemyNewCoords = enemyJetsPresent && 
      enemyJets.map(enemy => {
        const update = { 
          username: enemy.username,
          newCoords: move(enemy.userJet)
        };
        return update;
      });


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