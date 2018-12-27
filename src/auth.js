/* global CODUS_APP_URL */

import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
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

export default {
  webAuth,
  jwtDecode,

  // Log in with a username and password
  login(email, password) {
    return new Promise((resolve, reject) => {
      webAuth.login({
        email,
        password,
      }, (err) => {
        reject(err);
      });
    });
  },

  signup(email, password, username, name) {
    return api.post({
      endpoint: '/user',
      body: { username, name, email, password }, // eslint-disable-line object-curly-newline
    })
      .then(() => this.login(email, password));
  },

  // See if the user is authenticated
  isAuthenticated() {
    return localStorage.getItem('id_token') !== null
      && localStorage.getItem('access_token') !== null;
  },

  // Check whether our access token is expired
  // Returns true if the token is expired
  loginExpired() {
    return Date.now() / 1000 > jwtDecode(localStorage.getItem('access_token')).exp;
  },
};
