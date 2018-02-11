// userManager.js

// oidcMiddleware.js

import React from 'react';
import createOidcMiddleware, { createUserManager, OidcProvider } from 'redux-oidc';

let baseUri=`${window.location.protocol}//${window.location.hostname}`;
let authority = 'http://localhost:5000';

if(process.env.ENV !== 'production')
{
  baseUri += `:${window.location.port}`;
  authority = 'http://localhost:5000';
}

// user manager configuration object, see oidc-client-js documentation for details
let config = {
  client_id: 'app id',
  redirect_uri: `${baseUri}/signin-idsr`,
  response_type: 'id_token token',
  scope: '',
  authority: authority,
  post_logout_redirect_uri: `${baseUri}/login`,
  silent_redirect_uri: `${baseUri}/silent-renew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
};

// create a user manager instance
const userManager = createUserManager(config);

export default userManager;