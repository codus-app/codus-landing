<template>
  <div class="illustration">
    <laptop ref="laptop" v-bind="{ initialVisibleState }">
      <icon-file></icon-file>
      <div class="test-cases">
        <div class="test">
          <icon-check-circle></icon-check-circle>
          <icon-x-circle></icon-x-circle>
        </div>
      </div>
    </laptop>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
