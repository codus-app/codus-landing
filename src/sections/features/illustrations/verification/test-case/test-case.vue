<template>
  <div class="test-case" v-bind:class="{ success: success === true, failure: success === false }">
    <icon-check-circle></icon-check-circle>
    <icon-x-circle></icon-x-circle>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
