<template>
  <div class="illustration">
    <laptop ref="laptop" v-bind="{ initialVisibleState }">

      <icon-file></icon-file>

      <div class="test-cases">

        <test-case
          v-for="i in 7"
          v-bind:key="i"
          v-bind="testCaseProps[i - 1]"
        ></test-case>

      </div>
    </laptop>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
