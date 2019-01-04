import items from './features-list';

export default {
  data: () => ({
    items,
    selectedIndex: 0,
    rotateZ2: 0,
  }),

  computed: { rotateZ() { return `${this.rotateZ2 * 10}deg`; }, },

  components: {
    laptop3d: require('./illustrations/laptop/laptop.vue').default,
  },
};
