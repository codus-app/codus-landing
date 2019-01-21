<template>
  <div class="illustration">
    <screen ref="screen">
      <canvas ref="opaque" class="opaque"></canvas>
    </screen>
    <magnifier ref="magnifier">
      <canvas ref="revealed" class="revealed"></canvas>
    </magnifier>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
