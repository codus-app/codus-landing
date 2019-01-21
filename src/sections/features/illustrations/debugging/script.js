export default {
  props: {
    initialVisibleState: Boolean,
  },

  methods: {
    out() {
      return this.$refs.magnifier.out();
    },
    in() {
      return this.$refs.magnifier.in();
    },
  },

  components: {
    magnifier: require('../_magnifier/magnifier.vue').default,
  },
};
