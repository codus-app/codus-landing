<!-- Dedicated login form -->
<template>
  <form class="login light" v-on:keydown.enter="$refs.button.click()">
    <h3>Welcome back.</h3>
    <h3 class="green">Log in here.</h3>

    <!-- Email -->
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
    <!-- Password -->
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
    <!-- Submit -->
    <loading-button
      ref="button"
      v-bind:onClick="submit"
      v-bind:enabled="canSubmit"
      text="Log in"
      theme="light"
    ></loading-button>
  </form>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
