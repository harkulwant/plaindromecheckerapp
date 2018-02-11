// oidcMiddleware.js

import React from 'react';
import createOidcMiddleware, { createUserManager } from 'redux-oidc';
import userManager from '../utils/userManager';


// create the middleware
const oidcMiddleware = createOidcMiddleware(userManager, () => true, false, '/signin-idsr');

export default oidcMiddleware;