<!-- Combined login and signup form -->
<template>
  <div class="entry light">
    <h3>Start learning today.</h3>
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

    <loading-button
      v-bind:onClick="submit"
      v-bind:enabled="buttonEnabled"
      v-bind:text="mode === 'login' ? 'Log in' : 'Continue'"
      theme="light"
    ></loading-button>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
