<template>
  <div id="app">
    <top-bar
      v-bind:links="sections"
      v-on:login="headerMode = 'login'"
      v-on:signup="headerMode = 'signup'"
      v-fade="{ delay: '1.6s', duration: '.45s' }"
    ></top-bar>
    <page-header v-bind:mode="headerMode"></page-header>
    <features-section></features-section>
  </div>
</template>

<script>
import sections from './sections';

export default {
  data: () => ({
    sections,
    headerMode: 'generic',
  }),
};
</script>
