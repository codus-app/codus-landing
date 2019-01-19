<template>
  <div class="illustration">
    <laptop class="laptop" ref="laptop" v-bind="{ initialVisibleState, typing: true, raised: true }">
      <canvas ref="canvas"></canvas>
    </laptop>

    <server ref="server" v-bind:initialVisibleState="false"></server>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
