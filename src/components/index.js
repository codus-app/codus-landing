/* eslint-disable import/first */
import Vue from 'vue';

// Feather icons
import { CheckIcon, XIcon, CheckCircleIcon, XCircleIcon, FileIcon } from 'vue-feather-icons'; // eslint-disable-line object-curly-newline, max-len
Vue.component('icon-check', CheckIcon);
Vue.component('icon-x', XIcon);
Vue.component('icon-check-circle', CheckCircleIcon);
Vue.component('icon-x-circle', XCircleIcon);
Vue.component('icon-file', FileIcon);

Vue.component('logo', require('./logo.vue').default);

Vue.component('entry-form', require('./entry/entry.vue').default);
Vue.component('text-input', require('./input/input.vue').default);
Vue.component('spinner', require('./spinner/spinner.vue').default);
Vue.component('loading-button', require('./loading-button/loading-button.vue').default);
Vue.component('feature-slider', require('./feature-slider/feature-slider.vue').default);
