<template>
  <div class="illustration">
    <laptop ref="laptop" v-bind="{ initialVisibleState }">
      <div class="problems" ref="container">
        <div class="problem"
          v-for="(p, i) in numProblems"
          v-bind:key="i"
          v-bind:style="styles[i]"
        ></div>
      </div>
    </laptop>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
