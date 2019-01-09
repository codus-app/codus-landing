<template>
  <div class="laptop3d">
    <div class="wrapper" ref="wrapper" v-bind:style="wrapperStyle">

      <div v-bind:class="{ base: true, typing }" ref="base"><div class="front"></div></div>

      <div class="lid" ref="lid" v-bind:style="lidStyle">
        <div class="front">
          <div class="screen" ref="screen">
            <slot></slot>
          </div>
        </div>
        <div class="back"></div>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
