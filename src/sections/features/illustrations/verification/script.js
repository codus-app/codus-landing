export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    testCaseProps: new Array(7).fill({}),
    timeout: null,
  }),

  computed: {
    // The index (in the testCaseProps array) of the testCase that occupies the center position
    centerIndex() { return this.testCaseProps.findIndex(({ position }) => position === 0); },
  },

  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { this.reset(); return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },

    reset() {
      clearTimeout(this.timeout);
      this.testCaseProps = new Array(7).fill(null)
        .map((_, i) => ({ success: null, position: -1 - i }));
      this.timeout = setTimeout(() => this.step(), 1300);
    },

    // Slide test cases to the side, and reset test cases from the far left to the far right
    move() {
      this.testCaseProps = this.testCaseProps.map(n => (n.position < 3
        // Move over if there's space
        ? { ...n, position: n.position + 1 }
        // If we've gotten off screen, reset to the right
        : { success: null, position: -3 }));
    },

    step() {
      this.move();
      this.timeout = setTimeout(() => {
        this.testCaseProps[this.centerIndex].success = Math.random() <= 0.66;
        this.timeout = setTimeout(() => {
          this.step();
        }, 500);
      }, 650);
    },
  },

  components: {
    'test-case': require('./test-case/test-case.vue').default,
    laptop: require('../_laptop/laptop.js').default,
  },
};
