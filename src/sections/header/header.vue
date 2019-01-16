<template>
  <header>

    <div class="container">
      <div class="left">
        <h1 v-header-text-entrance="{ delay: '.35s' }">
          <span class="anim">Write,</span> <span class="anim">Run,</span>
          <br>
          <span class="anim"><span class="green">Solve.</span></span>
        </h1>

        <p v-fade.up="{ delay: '1.1s' }" data-content="
          Learn to solve practical problems with software. Master principles of programming whether
          you’re an amateur, a student, or a professional.
        "></p>
      </div>

      <div class="right">
        <entry-form v-fade="{ delay: '1.6s', duration: '1s' }"></entry-form>
      </div>
    </div>

  </header>
</template>

<script></script>

<style scoped lang="sass" src="./style.sass"></style>
