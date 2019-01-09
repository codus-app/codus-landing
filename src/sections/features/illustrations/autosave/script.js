export default {
  props: {
    initialVisibleState: Boolean,
  },

  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },
  },

  components: { laptop: require('../_laptop/laptop.js').default },
};
