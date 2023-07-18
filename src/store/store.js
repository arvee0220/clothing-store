import { compose, applyMiddleware, createStore } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
// import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

// root-reducer
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
