import Vue from 'vue';

// Multiply a CSS value
function multCss(val, mul) {
  const val2 = [parseFloat(val), val.match(/[a-zA-Z]/g).join('')];
  val2[0] *= mul;
  return val2.join('');
}

const FadeEntrance = {
  inserted(el, binding) {
    const delay = (binding.value || {}).delay || '0s';
    const duration = (binding.value || {}).duration || '.65s';
    if (el) {
      el.style.opacity = 0;
      el.style.animation = [
        //        If we're also fading up, make the opacity animation shorter
        `fadeIn ${multCss(duration, binding.modifiers.up ? 0.8 : 1)} ${delay} ease-out forwards`,
        // If 'up' is true, include a second animation for fading up
        ...binding.modifiers.up
          ? [`up ${duration} ${delay} cubic-bezier(0.165, 0.84, 0.44, 1)`]
          : [],
      ].join(', ');
    }
  },
};

Vue.directive('fade', FadeEntrance);
