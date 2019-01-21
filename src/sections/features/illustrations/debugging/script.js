export default {
  props: {
    initialVisibleState: Boolean,
  },

  methods: {
    out() {
      return Promise.all([
        this.$refs.magnifier.out(),
        new Promise(resolve => setTimeout(() => this.$refs.screen.out().then(resolve), 70)),
      ]);
    },

    in() {
      return Promise.all([
        this.$refs.screen.in(),
        new Promise(resolve => setTimeout(() => this.$refs.magnifier.in().then(resolve), 200)),
      ]);
    },
  },

  components: {
    screen: require('../_screen/screen.vue').default,
    magnifier: require('../_magnifier/magnifier.vue').default,
  },
};
