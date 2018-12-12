import Vue from 'vue';

// HTML
import './index.html';

// Styles
import './style.sass';

// Load components
import './components';
import './sections';

import auth from './auth';
window.auth = auth;

window.app = new Vue({
  el: '#app',
});
