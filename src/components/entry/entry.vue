<!-- Combined login and signup form -->
<template>
  <form class="entry light">
    <h3>Start learning today.</h3>

    <main-page
      class="page"
      v-on:emailchange="email = $event"
      v-on:passwordchange="password = $event"

      v-on:modechange="mode = $event"
      v-on:validationchange="mainPageValid = $event"
    ></main-page>

    <loading-button
      v-bind:onClick="submit"
      v-bind:enabled="mainPageValid"
      v-bind:text="mode === 'login' ? 'Log in' : 'Continue'"
      theme="light"
    ></loading-button>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
