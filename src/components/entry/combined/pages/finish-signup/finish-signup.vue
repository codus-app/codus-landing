<template>
  <div class="page finish-signup">
    <h3 class="green">One more step.</h3>

    <h4 v-bind:class="{ collapse }">Choose a unique username, and choose how you will appear to other users.</h4>

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
