<template>
  <div class="magnifier" v-bind:style="style">
    <div class="magnifier3d">
      <div class="wrapper" v-bind:style="wrapperStyle">
        <div class="handle"></div>
        <div class="lens">
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
