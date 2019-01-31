<!-- Dedicated signup form -->
<template>
  <form class="signup">
    <h3>Welcome aboard!</h3>
    <h3 class="green">Let's get started.</h3>

    <!-- Email -->
    <text-input
      v-model="email"
      name="email"
      type="email"
      placeholder="Email address"
      v-bind:status="emailStatus"
      v-bind:message="emailMessage"
      theme="light"
    ></text-input>
    <div class="input-group">
      <!-- Username -->
      <text-input
        v-model="username"
        type="text"
        v-bind:placeholder="'U\u200Bsername'"
        v-bind:status="usernameStatus"
        v-bind:message="usernameMessage"
        theme="light"
      ></text-input>
      <!-- Name -->
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
    <!-- Password -->
    <text-input
      v-model="password"
      name="password"
      type="password"
      placeholder="Password"
      v-bind:status="passwordStatus"
      v-bind:message="passwordMessage"
      v-bind:disableAutocomplete="true"
      theme="light"
    ></text-input>
    <!-- Submit -->
    <loading-button
      v-bind:onClick="submit"
      v-bind:enabled="canSubmit"
      text="Log in"
      theme="light"
    ></loading-button>
  </form>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="../login/style.sass"></style>
<style scoped lang="sass" src="./style.sass"></style>
