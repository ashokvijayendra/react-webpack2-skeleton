import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import reducers from './reducers';
import { createMiddleware } from 'redux-promises';
const promisesMiddleware = createMiddleware();
const composeEnhancers = process.browser ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

export default function configureStore() {
  const store = applyMiddleware(promisesMiddleware)(createStore)(reducers);
 
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  
  return store;
}