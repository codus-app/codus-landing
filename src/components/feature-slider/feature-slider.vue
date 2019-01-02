<template>
  <div class="feat-slider">
    <div class="slider">
      <div class="track"></div>
      <div class="thumb"></div>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="(item, i) in items"
        v-bind:key="i"
      >
        <h4>{{ item.title }}</h4>
        <p>{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
