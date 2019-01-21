export default {
  props: {
    initialVisibleState: Boolean,
  },

  methods: {
    out() {
      return Promise.all([
        this.$refs.magnifier.out(),
        this.$refs.screen.out(),
      ]);
    },

    in() {
      return Promise.all([
        this.$refs.screen.in(),
        this.$refs.screen.out(),
      ]);
    },
  },

  components: {
    screen: require('../_screen/screen.vue').default,
    magnifier: require('../_magnifier/magnifier.vue').default,
  },
};
