<template>
  <header>

    <div class="container">
      <div class="left">
        <h1 v-header-text-entrance="{ delay: '.35s' }">
          <span class="anim">Write,</span> <span class="anim">Run,</span>
          <br>
          <span class="anim"><span class="green">Solve.</span></span>
        </h1>

        <p v-fade.up="{ delay: '1.1s' }">
          <span class="contents">
            Learn to solve practical problems with software. Master principles of programming
            whether you’re an amateur, a student, or a professional.
          </span>
        </p>
      </div>

      <div class="right"  v-fade="{ delay: '1.6s', duration: '1s' }">
        <div class="forms-container" v-bind:class="animClass">
          <!-- Login forms only show if the browser is supported -->
          <template v-if="browserSupported">
            <transition name="form-fade">
              <combined-entry-form v-if="mode === 'generic'"></combined-entry-form>
            </transition>
            <transition name="form-fade">
              <login-form v-if="mode === 'login'"></login-form>
            </transition>
            <transition name="form-fade">
              <signup-form v-if="mode === 'signup'"></signup-form>
            </transition>
          </template>

          <unsupported-browser-message v-if="!browserSupported"></unsupported-browser-message>
        </div>
      </div>
    </div>

  </header>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
