/* eslint-disable import/first */
import 'babel-polyfill';
import 'promise-polyfill';
import 'abortcontroller-polyfill';
import 'whatwg-fetch';
import smoothscroll from 'smoothscroll-polyfill'; smoothscroll.polyfill();

import Vue from 'vue';

// HTML
import './index.html';

// Styles
import './style.sass';

// Load components
import './components';
import sections from './sections';

import './animated-entrance';

import auth from './auth';
window.auth = auth;

window.app = new Vue({
  el: '#app',

  data: { sections },
});
