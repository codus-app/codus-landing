export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    testCaseProps: new Array(7).fill({}),
  }),

  mounted() {
    this.reset();
  },

  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },

    reset() {
      this.testCaseProps = new Array(7).fill(null)
        .map((_, i) => ({ success: null, position: -1 - i }));
    },

    // Slide test cases to the side, and reset test cases from the far left to the far right
    move() {
      this.testCaseProps = this.testCaseProps.map(n => (n.position < 3
        // Move over if there's space
        ? { ...n, position: n.position + 1 }
        // If we've gotten off screen, reset to the right
        : { success: null, position: -3 }));
    },
  },

  components: {
    'test-case': require('./test-case/test-case.vue').default,
    laptop: require('../_laptop/laptop.js').default,
  },
};
