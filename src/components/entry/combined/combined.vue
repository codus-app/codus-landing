<!-- Combined login and signup form -->
<template>
  <form class="generic entry light" v-bind:class="{ [`page-${page}`]: true }" v-on:keydown.enter="$refs.button.click()">
    <h3>Start learning today.</h3>

    <div class="page-switch">

      <main-page
        v-on:emailchange="email = $event"
        v-on:passwordchange="password = $event"
        v-bind:emailError="getError('email')"
        v-bind:passwordError="getError('password')"

        v-on:modechange="mode = $event"
        v-on:validationchange="mainPageValid = $event"
      ></main-page>

      <role-select-page v-model="role"></role-select-page>

      <final-signup-page
        v-on:usernamechange="username = $event"
        v-on:namechange="name = $event"
        v-bind:usernameError="getError('username')"
        v-bind:nameError="getError('name')"

        v-on:validationchange="page2Valid = $event"
      ></final-signup-page>

    </div>

    <loading-button
      ref="button"
      v-bind:onClick="submit"
      v-bind:enabled="[mainPageValid, roleSelected, page2Valid][page - 1]"
      v-bind:text="buttonText"
      theme="light"
    ></loading-button>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
