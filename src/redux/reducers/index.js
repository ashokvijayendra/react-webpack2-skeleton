import { combineReducers } from 'redux';
import todos from './todos';
import counter from './counter';
import { reducer as idleReducer } from 'redux-promises';

const reducers = combineReducers({
    idle: idleReducer,
    todos,
    counter
});

export default reducers;
