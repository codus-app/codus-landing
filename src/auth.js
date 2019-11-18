/* global CODUS_APP_URL, BASE_DOMAIN */

import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import * as api from './api';

const webAuth = new auth0.WebAuth({
  domain: 'codus.auth0.com',
  clientID: 'y4m8JcL7boD2FKwH3fwTS9GusF07z4IT',
  responseType: 'token id_token',
  realm: 'Username-Password-Authentication',
  audience: 'https://engine.codus.io/',
  scope: 'openid profile email execute write:solutions read:solutions',
  redirectUri: CODUS_APP_URL,
});

// Adapted from https://github.com/auth0/auth0.js/blob/master/src/helper/random.js
function randomString(length) {
  const bytes = new Uint8Array(length);
  const result = [];
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';

  const crypto = window.crypto || window.msCrypto;
  const random = crypto.getRandomValues(bytes);
  for (let i = 0; i < random.length; i += 1) result.push(charset[random[i] % charset.length]);

  return result.join('');
}


export default {
  webAuth,
  jwtDecode,

  // Log in with a username and password
  async login(email, password) {
    // Generate secure state + nonce
    const state = randomString(32);
    const nonce = randomString(32);

    // Store state + nonce
    const options = { domain: BASE_DOMAIN, SameSite: 'None', Secure: true };
    Cookies.set('state', state, options);
    Cookies.set('nonce', nonce, options);


    // Perform login
    return new Promise((resolve, reject) => {
      webAuth.login({
        email,
        password,
        state, // Backend gets these values via postMessage
        nonce,
      }, (err) => {
        reject(err);
      });
    });
  },

  signup(email, password, username, name, role = 'student') {
    return api.post({
      endpoint: '/user',
      body: { username, name, email, password, role }, // eslint-disable-line object-curly-newline
    })
      .then(() => this.login(email, password));
  },

  // See if the user is authenticated
  isAuthenticated() {
    return !!Cookies.get('id_token')
      && !!Cookies.get('access_token');
  },

  // Check whether our access token is expired
  // Returns true if the token is expired
  loginExpired() {
    return Date.now() / 1000 > jwtDecode(Cookies.get('access_token')).exp;
  },

  // Send the given user an email inviting them to change their password
  requestPasswordReset(email) {
    return new Promise((resolve, reject) => {
      webAuth.changePassword({
        connection: 'Username-Password-Authentication',
        email,
      }, (err, resp) => {
        if (err) reject(err);
        else resolve(resp);
      });
    });
  },
};
