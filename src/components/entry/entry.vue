<!-- Combined login and signup form -->
<template>
  <form class="entry light" v-bind:class="{ [`page-${page}`]: true }">
    <h3>Start learning today.</h3>

    <div class="page-switch">

      <main-page
        v-on:emailchange="email = $event"
        v-on:passwordchange="password = $event"

        v-on:modechange="mode = $event"
        v-on:validationchange="mainPageValid = $event"
      ></main-page>

      <signup-page-2></signup-page-2>

    </div>

    <loading-button
      v-bind:onClick="submit"
      v-bind:enabled="mainPageValid"
      v-bind:text="buttonText"
      theme="light"
    ></loading-button>
  </form>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
