<template>
  <div class="page signup-2">
    <h3 class="green">One more step.</h3>

    <text-input
      v-model="username"
      type="text"
      v-bind:placeholder="'U\u200Bsername'"
      v-bind:status="usernameStatus"
      v-bind:message="usernameMessage"
      theme="light"

      v-on:blur="checkUsername"
    ></text-input>

    <text-input
      v-model="name"
      name="name"
      type="text"
      placeholder="Display Name"
      v-bind:status="nameStatus"
      v-bind:message="nameMessage"
      theme="light"
    ></text-input>
  </div>
</template>

<style scoped lang="sass" src="./style.sass"></style>
<script src="./script.js"></script>
