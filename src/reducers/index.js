// index.js

import {combineReducers} from 'redux';
import leads from './leadReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { reducer as oidcReducer } from 'redux-oidc';

const rootReducer = combineReducers({
	leads: leads,
	ajaxCallsInProgress: ajaxCallsInProgress,
	oidc: oidcReducer
});

export default rootReducer;