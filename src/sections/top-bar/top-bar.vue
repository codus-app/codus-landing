<template>
  <div class="top-bar">

    <span
      class="link"
      v-for="(link, i) in links"
      v-bind:key="i"
    >
      {{ link.name }}
    </span>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
