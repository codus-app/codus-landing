<template>
  <div id="app">
    <top-bar v-bind:links="sections" v-fade="{ delay: '1.6s', duration: '.45s' }"></top-bar>
    <page-header></page-header>
    <features-section></features-section>
  </div>
</template>

<script>
import sections from './sections';

export default {
  data: () => ({ sections }),
};
</script>
