<template>
  <div class="server" v-bind:style="style">
    <div class="server3d">
      <div class="wrapper" ref="wrapper" v-bind:style="wrapperStyle">
        <div class="box">
          <div class="left"></div>
          <div class="right">
            <div class="label">codus-engine</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
