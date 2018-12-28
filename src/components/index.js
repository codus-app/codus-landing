/* eslint-disable import/first */
import Vue from 'vue';

// Feather icons
import { CheckIcon, XIcon } from 'vue-feather-icons'; // eslint-disable-line object-curly-newline, max-len
Vue.component('icon-check', CheckIcon);
Vue.component('icon-x', XIcon);

Vue.component('logo', require('./logo.vue').default);

Vue.component('entry-form', require('./entry/entry.vue').default);
Vue.component('text-input', require('./input/input.vue').default);
Vue.component('spinner', require('./spinner/spinner.vue').default);
Vue.component('loading-button', require('./loading-button/loading-button.vue').default);
