<template>
  <div class="feat-slider">
    <div class="slider">
      <div class="track" ref="track"></div>
      <div class="thumb" v-bind:style="thumbStyle"></div>
    </div>
    <div class="list">
      <div
        v-for="(item, i) in items"
        v-bind:class="{ item: true, selected: i === value }"
        v-bind:key="i"
        ref="items"
        v-on:mouseenter="change(i)"
      >
        <h4 v-html="item.title.replace(/<\/?br>/g, ' ')"></h4>
        <p v-html="item.desc"></p>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
