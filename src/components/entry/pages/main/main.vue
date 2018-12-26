<template>
  <div class="main">
    <h3 class="green">Let's get started.</h3>

    <text-input
      v-model="email"
      name="email"
      type="email"
      placeholder="Email address"
      v-bind:status="emailStatus"
      v-bind:message="emailMessage"
      theme="light"

      v-on:blur="checkEmail"
    ></text-input>

    <text-input
      v-model="password"
      name="password"
      type="password"
      placeholder="Password"
      v-bind:status="passwordStatus"
      v-bind:message="passwordMessage"
      theme="light"

      v-on:blur="showPasswordValidation2 = true"
    ></text-input>
  </div>
</template>

<style scoped lang="sass" src="./style.sass"></style>
<script src="./script.js"></script>
