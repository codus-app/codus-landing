import { isSupported as browserSupported } from '../../browser-detect';

export default {
  props: {
    mode: { type: String, required: true, validator: val => ['generic', 'login', 'signup'].includes(val) },
  },

  data: () => ({
    animClass: '',
    browserSupported,
  }),

  watch: {
    async mode() {
      // Trigger animation
      this.animClass = '';
      await this.$nextTick();
      (() => {})(this.$el.offsetHeight); // Force reflow
      this.animClass = 'anim';
    },
  },
};
