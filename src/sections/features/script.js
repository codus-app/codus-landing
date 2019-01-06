import items from './features-list';

export default {
  data: () => ({
    items,
    selectedIndex: 0,
  }),

  components: {
    laptop: require('./illustrations/laptop.js').default,
  },
};
