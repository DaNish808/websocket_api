import { 
  MOVE, ENEMY_MOVE, 
  HIT, KILL, ENEMY_HIT, ENEMY_KILL,
  JET, 
} from '../constants';
import { move, checkCollisions } from '../../utils/jetPhysics';

export function moveAll(cycleCount) {
  return (dispatch, getState) => {

    /*** define all moving objects ***/
    const { 
      me: { username: myUsername, userJet }, 
      members, socket 
    } = getState();

    const userHasJet = !!userJet;
    
    const enemyJets = members
      .filter(m => m.userJet)
      .map(m => ({ username: m.username, userJet: m.userJet }));
    const enemyJetsPresent = !!enemyJets;
    

    /*** project user's jet movement ***/
    const myNewJetState = {
      username: myUsername,
      health: null,
      coords: null,
      objType: JET
    };
    let userSurvived = null;
    if(userHasJet) {
      userSurvived = true;

      myNewJetState.health = userJet.health;
      myNewJetState.coords = move(userJet);

      // periodically broadcast location updates to other users (for lag)
      if(cycleCount === 0) {
        socket.emit('my-jet-current-status', { ...userJet, ...myNewJetState.coords });
      }
    }


    /*** project enemies' jet movements ***/
    // at each projection, check for collisions 
    //   against all previously projected jet movements
    let usersCollided = [];
    let enemyNewJetStates = [];
    if(enemyJetsPresent) {
      for(let i = 0; i < enemyJets.length; i++) {

        const { username, userJet } = enemyJets[i];

        // project movement for this enemy
        const newState = { 
          username,
          health: userJet.health,
          coords: move(userJet),
          objType: JET
        };

        
        // check for collisions against previous
        const myNewJetStateArr = [];
        if(userHasJet) myNewJetStateArr.push(myNewJetState);

        const newCollisions = checkCollisions(
          newState,
          [ ...myNewJetStateArr, ...enemyNewJetStates ]
        );
        usersCollided = [...usersCollided, ...newCollisions] ;


        // add this projection to previous
        enemyNewJetStates.push(newState);
      }
    }


    let hits = [];
    let scorers = [];
    // TODO: projectile hits


    // remove collided jets move queue

    const userCollisionI = usersCollided.indexOf(myUsername);
    if(userHasJet && userCollisionI !== -1) {
      userSurvived = false;
    }
    enemyNewJetStates = enemyNewJetStates.filter(enemy => !usersCollided.includes(enemy.username));


    // dispatch kills
    usersCollided.forEach(username => {
      socket.emit('jet-status-action', {
        type: KILL,
        payload: username
      });
    });


    // dispatch movements
    if(userHasJet && userSurvived) {
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




export function updateJetStatus(action) {
  return (dispatch, getState) => {
    const { username } = getState().me;

    if(action.payload === username) {
      delete action.payload;
    }
    else {
      action.type = 'ENEMY_' + action.type;
    }

    dispatch(action);
  };
}