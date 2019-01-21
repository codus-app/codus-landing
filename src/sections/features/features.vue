<template>
  <section id="features">
    <div class="container">
      <h2 class="pre-header">Key Features</h2>
      <h1 v-html="items[selectedIndex].title"></h1>

      <feature-slider
        v-model="selectedIndex"
        v-bind:items="items"
      ></feature-slider>

      <div class="illustrations">
        <div class="background"></div>
        <problems-illustration v-bind:initialVisibleState="true" ref="problems-illustration"></problems-illustration>
        <autosave-illustration v-bind:initialVisibleState="false" ref="autosave-illustration"></autosave-illustration>
        <verification-illustration v-bind:initialVisibleState="false" ref="verification-illustration"></verification-illustration>
        <debugging-illustration v-bind:initialVisibleState="false" ref="debugging-illustration"></debugging-illustration>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass" src="./style.sass"></style>
<script src="./script.js"></script>
