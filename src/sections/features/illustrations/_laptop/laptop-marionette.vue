<template>
  <div class="laptop3d">
    <div class="wrapper" ref="wrapper" v-bind:style="wrapperStyle">

      <div class="base" ref="base" v-bind:class="{ typing }">
        <div class="front"></div>
        <slot name="base"></slot>
      </div>

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

<script src="./marionette.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
