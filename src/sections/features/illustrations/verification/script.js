const dpr = window.devicePixelRatio;

export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    ctx: undefined,
    running: true,
  }),

  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
    this.$refs.canvas.width = this.$refs.canvas.offsetWidth * dpr;
    this.$refs.canvas.height = this.$refs.canvas.offsetHeight * dpr;

    this.draw();
  },

  // Allow restarting animation by setting 'running' back to true after stopping
  watch: { running(is) { if (is) this.draw(); } },

  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },

    draw() {
      const { canvas } = this.$refs;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (this.running) requestAnimationFrame(() => this.draw());
    },
  },

  components: { laptop: require('../_laptop/laptop.js').default },
};
