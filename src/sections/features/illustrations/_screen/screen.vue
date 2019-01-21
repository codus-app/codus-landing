<template>
  <div class="screen" v-bind:style="style">
    <div class="screen3d">
      <div class="wrapper" v-bind:style="wrapperStyle">

        <div class="box">
          <div class="back"></div>
          <div class="contents">

            <slot></slot>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
