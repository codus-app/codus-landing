<template>
  <div class="unsupported-browser-message">
    <h3>
      Your browser isn’t supported yet.
    </h3>

    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 117">
      <defs>
        <path id="a" d="M17 32.6c-8.6 0-15.6-7-15.6-15.6S8.4 1.4 17 1.4s15.6 7 15.6 15.6-7 15.6-15.6 15.6zm0-28.4C10 4.3 4.2 10 4.2 17c0 7 5.7 12.8 12.8 12.8 7 0 12.8-5.7 12.8-12.8C29.8 10 24 4.2 17 4.2zM18.4 17v-5.7c0-.8-.5-1.4-1.4-1.4-.9 0-1.4.6-1.4 1.4V17c0 .9.5 1.4 1.4 1.4.9 0 1.4-.5 1.4-1.4zm-.4 6.7c.1-.2.3-.3.3-.5l.1-.5-.1-.6c-.2-.1-.2-.3-.3-.4 0 0-.1-.2-.3-.2l-.3-.1c-.5-.3-1.1-.1-1.5.3-.2.1-.3.3-.3.4l-.2.6c0 .4.2.7.5 1 .2.2.5.4 1 .4s.8-.2 1-.4z"/>
        <path id="c" d="M0 0h200v4a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V0z"/>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(22 2)">
          <path fill="#232323" stroke="#C6C6C6" stroke-width="1.8" d="M3-.9h150c2.1 0 3.9 1.8 3.9 3.9v105.9H-1V3C-.9.9 1-.9 3-.9z"/>
          <rect width="146" height="99" x="5" y="5" fill="#3BDB83" rx="1"/>
          <g opacity=".3" transform="translate(60.8 37)">
            <mask id="b" fill="#fff"> <use xlink:href="#a"/> </mask>
            <use fill="#000" fill-rule="nonzero" xlink:href="#a"/>
            <g fill="#000" mask="url(#b)"> <path d="M0 0h34v34H0z"/> </g>
          </g>
        </g>
        <g transform="translate(0 110)">
          <mask id="d" fill="#fff"> <use xlink:href="#c"/> </mask>
          <use fill="#C6C6C6" xlink:href="#c"/>
          <rect width="42" height="6" x="79" y="-3" fill="#000" fill-opacity=".2" mask="url(#d)" rx="3"/>
        </g>
      </g>
    </svg>

    <p>
      Right now, Codus needs a recent version of
      <a target="_blank" rel="noopener noreferrer" v-bind:href="chromeUrl">Chrome</a>
      or
      <a target="_blank" rel="noopener noreferrer" v-bind:href="firefoxUrl">Firefox</a>
      in order to work properly.
    </p>

    <div class="links">
      <a target="_blank" rel="noopener noreferrer" v-bind:href="chromeUrl" class="button">
        Get Chrome
      </a>

      <a target="_blank" rel="noopener noreferrer" v-bind:href="firefoxUrl" class="button">
        Get Firefox
      </a>
    </div>

  </div>
</template>

<script>

export default {
  data: () => ({
    chromeUrl: 'https://www.google.com/chrome/',
    firefoxUrl: 'https://www.mozilla.org/firefox/',
  }),
};

</script>

<style scoped lang="sass" src="./style.sass"></style>
