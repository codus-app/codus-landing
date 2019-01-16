<template>
  <header>

    <div class="container">
      <div class="left">
        <h1>
          Write, Run,<br><span class="green">Solve.</span>
        </h1>

        <p v-fade.up="{ delay: '0.5s' }" data-content="
          Learn to solve practical problems with software. Master principles of programming whether
          you’re an amateur, a student, or a professional.
        "></p>
      </div>

      <div class="right">
        <entry-form v-fade.up="{ delay: '0.75s', duration: '.85s' }"></entry-form>
      </div>
    </div>

  </header>
</template>

<script></script>

<style scoped lang="sass" src="./style.sass"></style>
