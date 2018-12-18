<!-- Combined login and signup form -->
<template>
  <div class="entry light">
    <h3>Start learning today.</h3>
    <h3 class="green">Let's get started.</h3>

    <text-input
      v-model="email"
      placeholder="Email address"
      v-bind:status="emailStatus"
      v-bind:message="emailMessage"
      theme="light"

      v-on:blur="checkEmail"
    ></text-input>

    <text-input
      v-model="password"
      placeholder="Password"
      v-bind:status="passwordStatus"
      v-bind:message="passwordMessage"
      :password="true"
      theme="light"

      v-on:blur="showPasswordValidation2 = true"
    ></text-input>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
