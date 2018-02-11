// configureStore.dev.js

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import oidcMiddleware from '../middleware/oidcMiddleware';

export default function configureStore(initialState){
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(
			applyMiddleware(thunk, reduxImmutableStateInvariant(), oidcMiddleware))
		);
}