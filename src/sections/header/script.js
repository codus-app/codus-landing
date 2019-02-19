export default {
  props: {
    mode: { type: String, required: true, validator: val => ['entry', 'login', 'signup'].includes(val) },
  },

  data: () => ({
    animClass: '',
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
