/* eslint-disable import/first */
import Vue from 'vue';

import FadeEntrance from './fade-entrance';
Vue.directive('fade', FadeEntrance);

import HeaderTextEntrance from './header-text-entrance';
Vue.directive('header-text-entrance', HeaderTextEntrance);
