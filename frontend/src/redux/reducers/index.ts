import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    user: userReducer,
});

// @ts-expect-error 'type'
export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export type AppDispatch = typeof store.dispatch;
