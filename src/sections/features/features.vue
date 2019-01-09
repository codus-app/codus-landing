<template>
  <section id="features">
    <div class="container">
      <h2 class="pre-header">Key Features</h2>
      <h1>{{ items[selectedIndex].title }}</h1>

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

    <svg viewBox="0 0 500 500" width="0" height="0">
      <clipPath id="illustration-mask" clipPathUnits="objectBoundingBox">
        <path d="M0.5,1 C0.776142375,1 1,0.776142375 1,0.5 C1,0.315905083 1,0.0659050834 1,-0.25 L0,-0.25 C0,0.0659050834 0,0.315905083 0,0.5 0,0.776142375 0.223857625,1 0.5,1 Z"></path>
      </clipPath>
    </svg>
  </section>
</template>

<style scoped lang="sass" src="./style.sass"></style>
<script src="./script.js"></script>
