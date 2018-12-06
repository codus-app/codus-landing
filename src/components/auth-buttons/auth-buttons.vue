<template>
  <div class="auth-buttons">
    <div v-on:click="$emit('signup')" v-if='!auth.isAuthenticated()'>Sign Up</div>
    <div v-on:click="$emit('login')" v-if='!auth.isAuthenticated()'>Log In</div>
    <div v-on:click="auth.logout()" v-if='auth.isAuthenticated()'>Log Out</div>
  </div>
</template>

<script>
import auth from '../auth';

export default {
  data: () => ({
    auth,
  }),
};
</script>

<style scoped lang="sass" src="./auth-buttons.sass"></style>
