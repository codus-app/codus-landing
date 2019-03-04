/* global CODUS_APP_URL */

import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import * as api from './api';
import './localstorage-iframe.html';

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

    // Send state + nonce to app via iframe postMessage
    const frame = document.querySelector('iframe#localstorage');
    const payload = { state, nonce };
    if (frame.hasAttribute('loaded')) frame.contentWindow.postMessage(payload, CODUS_APP_URL);
    else {
      await new Promise(resolve => frame.addEventListener('load', () => {
        frame.contentWindow.postMessage(payload, CODUS_APP_URL);
        resolve();
      }));
    }

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


// Auth
const frame = document.createElement('iframe');
frame.src = `${CODUS_APP_URL}/localstorage-iframe.html`;
frame.id = 'localstorage';
frame.style.display = 'none';
frame.onload = () => frame.setAttribute('loaded', '');
document.body.appendChild(frame);
