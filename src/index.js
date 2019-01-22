/* eslint-disable import/first */
/* global CODUS_APP_URL */
import 'babel-polyfill';
import 'promise-polyfill';
import 'abortcontroller-polyfill';
import 'whatwg-fetch';
import smoothscroll from 'smoothscroll-polyfill'; smoothscroll.polyfill();
import './ctx-round-rect';

import Vue from 'vue';

// HTML
import './index.html';

// Styles
import './style.sass';

// Load components
import './components';
import sections from './sections';

import './directives';

import auth from './auth';
window.auth = auth;

window.app = new Vue({
  el: '#app',

  data: { sections },
});

if (auth.isAuthenticated() && !auth.loginExpired()) window.location.replace(CODUS_APP_URL);
