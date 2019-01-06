import items from './features-list';

export default {
  data: () => ({
    items,
    selectedIndex: 0,

    laptopPose: {},
    laptopTransition: [1],
  }),

  computed: {
    laptopProps() {
      const { laptopTransition } = this;
      const [transitionTime, transitionEasing = 'ease'] = laptopTransition;
      return { ...this.laptopPose, transitionTime, transitionEasing };
      return { ...this.laptopPose };
  },
  },

  components: {
    laptop3d: require('./illustrations/laptop/laptop.vue').default,
  },
};
