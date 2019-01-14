function randInt(low, high) {
  return Math.floor((Math.random() * (high - low)) + low);
}

export default {
  props: {
    initialVisibleState: Boolean,
  },

  mounted() {
    this.init();
    this.step();
  },
  watch: { numProblems() { this.init(); } },

  data: () => ({
    numProblems: 50,
    tripDuration: 5000,

    running: true,
    styles: [],
  }),

  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },

    init() {
      this.styles = new Array(this.numProblems).fill(null).map((_, i) => ({
        // Some start behind screen so that their entry is delayed
        timeCreated: new Date(Date.now() + ((this.tripDuration / this.numProblems) * i)),

        top: `${randInt(25, 75)}%`,
        left: `${randInt(25, 75)}%`,
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0)',
      }));
    },

    step() {
      this.styles = this.styles.map(({ timeCreated, ...styles }) => {
        const delta = new Date() - timeCreated;
        // if (i === 0 && delta < 100) console.log(delta);
        // If it's run its course, regenerate in the back
        if (delta > this.tripDuration) {
          return {
            timeCreated: new Date(),
            top: `${randInt(15, 85)}%`,
            left: `${randInt(15, 85)}%`,
            opacity: 0,
            transform: 'translate3d(-50%, -50%, 0)',
          };
        }

        // Otherwise move forward
        const progress = Math.max(delta / this.tripDuration, 0);
        const opacity = (function piecewise(x) {
          if (x < 0.1) return Math.max(10 * x, 0);
          if (x < 0.6) return 1;
          return Math.max((-2.5 * x) + 2.5, 0);
        }(progress));
        const size = [this.$refs.container.offsetWidth, this.$refs.container.offsetHeight];
        const pos = [styles.left, styles.top].map(s => parseInt(s, 10));
        const center = [50, 50];
        const centerOffset = [pos[0] - center[0], pos[1] - center[1]];
        const centerOffsetPx = centerOffset.map((percent, i) => (percent / 100) * size[i]);

        return {
          timeCreated,
          ...styles,
          opacity,
          transform: `translate3d(calc(-50% + ${centerOffsetPx[0] * progress * 0.75}px), calc(-50% + ${(centerOffsetPx[1] - 10) * progress * 0.75}px), ${progress * 75}px)`,
        };
      });

      if (this.running) setTimeout(() => requestAnimationFrame(() => this.step()));
    },
  },

  components: { laptop: require('../_laptop/laptop.js').default },
};
