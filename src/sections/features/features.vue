<template>
  <section id="features">
    <div class="container">
      <h2 class="pre-header">Key Features</h2>
      <h1>{{ items[selectedIndex].title }}</h1>

      <feature-slider
        v-model="selectedIndex"
        v-bind:items="items"
      ></feature-slider>

    </div>
  </section>
</template>

<style scoped lang="sass" src="./style.sass"></style>
<script src="./script.js"></script>
