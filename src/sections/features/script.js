import items from './features-list';

export default {
  data: () => ({
    items,
    selectedIndex: 0,
  }),

  watch: {
    async selectedIndex(selected, oldSelected) {
      const laptops = ['problems-illustration', 'autosave-illustration', 'verification-illustration', 'debugging-illustration'];
      await this.$refs[laptops[oldSelected]].out();
      if (this.selectedIndex === selected) this.$refs[laptops[selected]].in();
    },
  },

  components: {
    laptop: require('./illustrations/_laptop/laptop.js').default,
    'problems-illustration': require('./illustrations/problems/problems.vue').default,
    'autosave-illustration': require('./illustrations/autosave/autosave.vue').default,
    'verification-illustration': require('./illustrations/verification/verification.vue').default,
    'debugging-illustration': require('./illustrations/debugging/debugging.vue').default,
  },
};
