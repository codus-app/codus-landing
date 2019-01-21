export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    entryTimeout: null,
  }),

  mounted() {
    const width = this.$refs.opaque.offsetWidth;
    const height = this.$refs.opaque.offsetHeight;
    this.$refs.opaque.width = width;
    this.$refs.opaque.height = height;
    this.$refs.revealed.width = width;
    this.$refs.revealed.height = height;

    this.$refs.revealed.style.width = `${width}px`;
    this.$refs.revealed.style.height = `${height}px`;
    this.$refs.revealed.style.top = `calc(50% - ${height / 2}px)`;
    this.$refs.revealed.style.left = `calc(50% - ${width / 2}px)`;
  },

  methods: {
    out() {
      clearTimeout(this.entryTimeout);
      return Promise.all([
        this.$refs.magnifier.out(),
        new Promise(resolve => setTimeout(() => this.$refs.screen.out().then(resolve), 70)),
      ]);
    },

    in() {
      return Promise.all([
        this.$refs.screen.in(),
        new Promise((resolve) => {
          this.entryTimeout = setTimeout(() => this.$refs.magnifier.in()
            .then(() => this.$emit('entered'))
            .then(resolve), 200);
        }),
      ]);
    },
  },

  components: {
    screen: require('../_screen/screen.vue').default,
    magnifier: require('../_magnifier/magnifier.vue').default,
  },
};
