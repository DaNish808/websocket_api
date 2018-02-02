import { 
  createStore, combineReducers, compose, applyMiddleware 
} from 'redux';
import thunk from 'redux-thunk';

import me from './reducers/me';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  me
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