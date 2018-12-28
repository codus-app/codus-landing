<template>
   <div class="loading-button" v-bind:class="{ disabled: !enabled, loading, [theme]: true }" v-on:click="click">
     <div class="button">{{ text }}</div>
     <spinner></spinner>
   </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
