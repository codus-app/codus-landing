import { CodeBlock, dpr } from '../autosave/script';

class BigCodeBlock extends CodeBlock {
  static get height() { return 8 * dpr; }
}


export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    entryTimeout: null,
    contexts: [],
    rows: [],
    raised: false,
  }),

  computed: {
    // Animation runs when animation is visible
    running() { return this.raised; },
  },

  mounted() {
    const width = this.$refs.opaque.offsetWidth;
    const height = this.$refs.opaque.offsetHeight;

    this.$refs.opaque.width = width * dpr;
    this.$refs.opaque.height = height * dpr;
    this.$refs.revealed.width = width * dpr;
    this.$refs.revealed.height = height * dpr;

    this.$refs.revealed.style.width = `${width}px`;
    this.$refs.revealed.style.height = `${height}px`;
    this.$refs.revealed.style.top = `calc(50% - ${height / 2}px)`;
    this.$refs.revealed.style.left = `calc(50% - ${width / 2}px)`;

    this.contexts = ['opaque', 'revealed'].map(r => this.$refs[r].getContext('2d'));
    this.contexts[0].filter = 'grayscale(85%)';

    this.addRow();
    this.draw();
  },

  // Allow restarting animation by setting 'running' back to true after stopping
  watch: { running(is) { if (is) this.draw(); } },

  methods: {
    out() {
      clearTimeout(this.entryTimeout);
      return Promise.all([
        this.$refs.magnifier.out(),
        new Promise(resolve => setTimeout(() => this.$refs.screen.out().then(resolve), 70)),
      ]).then(() => { this.raised = false; });
    },

    in() {
      this.raised = true;
      return Promise.all([
        this.$refs.screen.in(),
        new Promise((resolve) => {
          this.entryTimeout = setTimeout(() => this.$refs.magnifier.in()
            .then(resolve), 200);
        }),
      ]);
    },

    // Adapted from autosave illustration

    addRow() {
      const row = [];
      const horizGap = 6 * dpr;
      const indent = (60 + Math.round(Math.random()) * 20) * dpr;
      for (let i = 0; i <= Math.floor(Math.random() * 7); i += 1) {
        const newX = indent + row.map(block => block.width + horizGap).reduce((a, b) => a + b, 0);
        const width = Math.floor(Math.random() * 60 + 5) * dpr;
        row.push(new BigCodeBlock(newX, width, this.$refs.opaque));
      }
      this.rows.push(row);
    },

    draw() {
      const canvas = this.$refs.opaque;
      this.contexts.forEach(ctx => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height));
      const bottomRow = this.rows.slice(-1)[0];

      this.rows = this.rows.filter(r => !r[0].offScreen);
      const gap = 6 * dpr;
      if (!bottomRow || bottomRow[0].y < canvas.height - (BigCodeBlock.height + gap)) this.addRow();
      [].concat(...this.rows).forEach(b => this.contexts.forEach(ctx => b.draw(ctx)));

      if (this.running) requestAnimationFrame(() => this.draw());
    },
  },

  components: {
    screen: require('../_screen/screen.vue').default,
    magnifier: require('../_magnifier/magnifier.vue').default,
  },
};
