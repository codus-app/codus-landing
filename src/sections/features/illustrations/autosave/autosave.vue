<template>
  <div class="illustration">
    <laptop ref="laptop" v-bind="{ initialVisibleState, typing: true }">
      Auto-saves as you type
    </laptop>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
