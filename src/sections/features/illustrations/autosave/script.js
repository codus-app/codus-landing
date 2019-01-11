const fps = 60;
const delay = 1000 / fps;


export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    ctx: undefined,
    interval: undefined,
  }),

  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');

    this.start();
  },

  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },

    start() { this.interval = setInterval(() => requestAnimationFrame(() => this.draw()), delay); },
    stop() { clearInterval(this.interval); },
    draw() {
    },
  },

  components: { laptop: require('../_laptop/laptop.js').default },
};
