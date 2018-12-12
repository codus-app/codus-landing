/* eslint-disable import/first */
import Vue from 'vue';

// Feather icons
import { UserIcon, LockIcon, AtSignIcon, MailIcon } from 'vue-feather-icons'; // eslint-disable-line object-curly-newline, max-len
Vue.component('user-icon', UserIcon);
Vue.component('lock-icon', LockIcon);
Vue.component('at-sign-icon', AtSignIcon);
Vue.component('mail-icon', MailIcon);

Vue.component('entry-form', require('./entry/entry.vue').default);
