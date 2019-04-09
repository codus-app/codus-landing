<template>
  <div class="page role-select">
    <slot name="heading"> <h3 class="green">Welcome aboard!</h3> </slot>

    <h4>Which best describes you?</h4>
    <div class="role-select">
      <div
        class="role"
        v-bind:class="{ selected: value === 'student' }"
        v-on:click="$emit('input', 'student')"
      >
        <h5>Student</h5>
        <p>Learn, practice, and improve your programming ability</p>
      </div>
      <div
        class="role"
        v-bind:class="{ selected: value === 'instructor' }"
        v-on:click="$emit('input', 'instructor')"
      >
        <h5>Instructor</h5>
        <p>Create classrooms, manage students, and assign homework</p>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
