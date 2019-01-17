import Vue from 'vue';

const HeaderTextEntrance = {
  inserted(el, binding) {
    if (el) {
      const delay = (binding.value || {}).delay || '0s';

      [...el.getElementsByClassName('anim')].forEach((span, i) => {
        Object.assign(span.style, {
          display: 'inline-block',
          overflow: 'hidden',
          margin: '0',
        });

        const childStyle = Object.entries({
          display: 'block',
          transform: 'translateY(100%)',
          animation: `textUp .75s calc(${i * 0.15}s + ${delay}) cubic-bezier(0.19, 1, 0.22, 1) forwards`,
        })
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ');

        // Wrap old content in a span
        span.innerHTML = `<span class="anim-inner" style="${childStyle}">${span.innerHTML}</span>`;
      });
    }
  },
};

Vue.directive('header-text-entrance', HeaderTextEntrance);
