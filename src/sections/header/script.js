export default {
  data: () => ({
    mode: 'entry',
    animClass: '',
  }),

  watch: {
    async mode() {
      this.animClass = '';
      await this.$nextTick();
      (() => {})(this.$el.offsetHeight); // Force reflow
      this.animClass = 'anim';
    },
  },
};
