import Vue from 'vue';

Vue.component('top-bar', require('./top-bar/top-bar.vue').default);
Vue.component('page-header', require('./header/header.vue').default);

export default [
  {
    name: 'Features',
  },
];
