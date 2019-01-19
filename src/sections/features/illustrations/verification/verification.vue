<template>
  <div class="illustration">
    <laptop ref="laptop" v-bind="{ initialVisibleState }">
      <icon-file></icon-file>
      <div class="test-cases">
        <div class="test"></div>
      </div>
    </laptop>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
