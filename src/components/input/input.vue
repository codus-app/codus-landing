<template>
  <div class="input" v-bind:class="{ [status]: true, [theme]: true }">
    <label v-bind:for="_uid" class="title" v-if="title">{{ title }}</label>
    <div class="input-container">
      <input
        v-bind:id="_uid"
        v-bind:name="name"
        v-bind:type="type"
        v-bind:autocomplete="disableAutocomplete ? 'new-password' : ''"
        v-bind:placeholder="placeholder"
        v-bind:value="value"

        v-on:input="onInput"
        v-on:blur="$emit('blur')"
        v-on:animationstart="$emit('autofill')"
      >

      <div class="indicator-wrapper">
        <component class="indicator" v-bind:is="{
          neutral: undefined,
          success: 'icon-check',
          failure: 'icon-x',
          loading: 'spinner'
        }[status]" v-bind:color="theme === 'dark' ? 'white' : '#232327'"></component>
      </div>
    </div>
    <div class="message">{{ message || '\xa0' }}</div>

    <slot></slot>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
