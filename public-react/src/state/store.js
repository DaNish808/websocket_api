import { 
  createStore, combineReducers, compose, applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';

import me from './reducers/me';
import members from './reducers/members';
import messages from './reducers/messages';
import socket from './reducers/socket';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  me, members, messages, socket
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
);

export default store;