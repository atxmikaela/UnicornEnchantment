import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import cornholeReducer from './cornholes';
import encounterReducer from './reviews';

const rootReducer = combineReducers({
  session: sessionReducer,
  cornholes: cornholeReducer,
  encounters: encounterReducer,
  // ...
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {





  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
