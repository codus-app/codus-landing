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

// App
import App from './App.vue';

// Styles
import './style.sass';

// Load components
import './components';

import './directives';

import auth from './auth';
window.auth = auth;


window.app = new Vue({
  el: '#app',
  render: h => h(App),

  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
});


if (auth.isAuthenticated()) window.location.replace(CODUS_APP_URL);
