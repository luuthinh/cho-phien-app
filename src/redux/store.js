import { composeWithDevTools} from 'redux-devtools-extension';
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducer';

const reducers = combineReducers({
    auth: loginReducer,
});

const middleware = [thunk];

const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;