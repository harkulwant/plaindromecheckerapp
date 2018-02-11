/*
	index.js
*/


/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {BrowserRouter as Router, history } from 'react-router-dom';
import routes from './routes';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {loadLeads} from './actions/leadActions';
import { OidcProvider } from 'redux-oidc';
import userManager from './utils/userManager';
import 'bootstrap';

const store = configureStore();
store.dispatch(loadLeads());

render(
	<Provider store={store}>
		<OidcProvider store={store} userManager={userManager}>
			<Router history={history}>
				{routes}
			</Router>
		</OidcProvider>
	</Provider>, 
	document.getElementById('root')
);
