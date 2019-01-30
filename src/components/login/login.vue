<!-- Dedicated login form -->
<template>
  <form class="login light">
    <h3>Welcome back.</h3>
    <h3 class="green">Log in here.</h3>

    <text-input
      v-model="email"
      name="email"
      type="email"
      placeholder="Email address"
      v-bind:status="emailStatus"
      v-bind:message="emailMessage"
      theme="light"

      v-on:blur="showEmailValidation = true"
    ></text-input>
    <text-input
      v-model="password"
      name="password"
      type="password"
      placeholder="Password"
      v-bind:status="passwordStatus"
      v-bind:message="passwordMessage"
      theme="light"
    >
      <div
        class="password-reset"
        v-on:click="passwordReset"
        v-bind:class="{ disabled: resetting !== null }"
      >
        {{ { null: 'Forgot passsword?', true: 'Sending...', false: 'Email sent' }[resetting] }}
      </div>
    </text-input>

    <loading-button
      v-bind:onClick="submit"
      v-bind:enabled="canSubmit"
      text="Log in"
      theme="light"f
    ></loading-button>
  </form>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
