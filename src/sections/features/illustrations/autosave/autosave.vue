<template>
  <div class="illustration">
    <laptop ref="laptop" v-bind="{ initialVisibleState, typing: true }">
      <canvas ref="canvas"></canvas>
      <div class="rings" slot="base">
        <div class="ring" slot="base"
          v-for="i in 4"
          v-bind:key="i"
        ></div>
      </div>
    </laptop>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
