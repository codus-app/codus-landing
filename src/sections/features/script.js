import items from './features-list';

export default {
  data: () => ({
    items,
    selectedIndex: 0,

    laptopPose: {},
  }),

  computed: {
    laptopProps() {
      return { ...this.laptopPose };
  },
  },

  components: {
    laptop3d: require('./illustrations/laptop/laptop.vue').default,
  },
};
