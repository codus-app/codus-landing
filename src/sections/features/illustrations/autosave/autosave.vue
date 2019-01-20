<template>
  <div class="illustration">
    <laptop class="laptop" ref="laptop" v-bind="{ initialVisibleState, typing: true, raised: true }">
      <canvas ref="canvas"></canvas>

      <div class="rings" v-bind:class="{ visible: raised }" slot="base">
        <div class="ring" slot="base"
          v-for="i in 3"
          v-bind:key="i"
        ></div>
      </div>
    </laptop>

    <server ref="server" v-bind:initialVisibleState="false"></server>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
