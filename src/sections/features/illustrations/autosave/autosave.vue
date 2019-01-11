<template>
  <div class="illustration">
    <laptop ref="laptop" v-bind="{ initialVisibleState, typing: true }">
      <canvas ref="canvas"></canvas>
    </laptop>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
