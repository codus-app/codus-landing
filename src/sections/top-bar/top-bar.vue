<template>
  <div class="top-bar">
    <logo v-on:click.native="scrollToTop"></logo>

    <div class="container">

      <span
        class="link"
        v-for="(link, i) in links"
        v-bind:key="i"
      >
        {{ link.name }}
      </span>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
