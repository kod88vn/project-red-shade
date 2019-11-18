import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import { books } from './reducers';

const initialState = {};
export const history = createBrowserHistory();

const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleware = [
    routerMiddleware(history),
    thunk
];

const store = createStore(
    combineReducers({
        router: connectRouter(history),
        bookData: books
    }),
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
);

export default store;
