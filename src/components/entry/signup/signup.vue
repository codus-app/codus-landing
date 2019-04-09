<!-- Dedicated signup form -->
<template>
  <form class="signup" v-bind:class="`page-${page}`" v-on:keydown.enter="$refs.button.click">
    <h3 style="margin-bottom: 0">Welcome aboard!</h3>

    <div class="page-switch">
      <!-- Page 1: role select (student or instructor ?) -->
      <role-select-page v-model="role">
        <h3 class="green" slot="heading">Let’s get started.</h3>
      </role-select-page>

      <div class="page">
        <h3 class="green">One more step.</h3>

        <div class="inputs">
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
        </div>
      </div>
    </div>

    <!-- Submit -->
    <loading-button
      ref="button"
      v-bind:onClick="proceed"
      v-bind:enabled="canProceed"
      v-bind:text="['Continue', 'Sign up'][page - 1]"
      theme="light"
    ></loading-button>
  </form>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="../login/style.sass"></style>
<style scoped lang="sass" src="./style.sass"></style>
