import items from './features-list';

export default {
  data: () => ({
    items,
    selectedIndex: 0,
  }),

  watch: {
    async selectedIndex(selected, oldSelected) {
      await this.$refs.laptops[oldSelected].out();
      if (this.selectedIndex === selected) this.$refs.laptops[selected].in();
    },
  },

  components: {
    laptop: require('./illustrations/laptop.js').default,
  },
};
