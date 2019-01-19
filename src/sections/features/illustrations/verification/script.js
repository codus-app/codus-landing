export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({

  }),

  mounted() {

  },


  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },

    // Slide test cases to the side
    move() {

    },
  },

  components: {
    'test-case': require('./test-case/test-case.vue').default,
    laptop: require('../_laptop/laptop.js').default,
  },
};
