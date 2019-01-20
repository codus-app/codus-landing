const colors = [
  '#8fbcbb',
  '#88c0d0',
  '#81a1c1',
  '#5e81ac',
  '#4c566a',
  '#2e3440',
];

const dpr = window.devicePixelRatio;

/* eslint-disable lines-between-class-members */
class CodeBlock {
  static get height() { return 6 * dpr; }
  static get speed() { return 100 * dpr; }

  constructor(x, width, canvas) {
    this.canvas = canvas;
    this.x = x; this.width = width;
    this.startTime = new Date();
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  get delta() { return (new Date() - this.startTime) / 1000; }
  get y() { return this.canvas.height - this.delta * CodeBlock.speed; }
  get offScreen() { return this.y < -CodeBlock.height; }

  draw(ctx) {
    ctx.fillStyle = this.color;
    const progress = (this.canvas.height - this.y) / this.canvas.height;
    ctx.globalAlpha = Math.max(Math.min((-5 * Math.abs(progress - 0.45)) + 2.75, 1), 0);
    ctx.fillRect(this.x, this.y, this.width, CodeBlock.height);
  }
}


export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    ctx: undefined,
    running: true,
    dpr,
  }),

  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
    this.rows = [];
    this.addRow();
    this.$refs.canvas.width = this.$refs.canvas.offsetWidth * this.dpr;
    this.$refs.canvas.height = this.$refs.canvas.offsetHeight * this.dpr;

    this.draw();
  },
  // Allow restarting animation by setting 'running' back to true after stopping
  watch: { running(is) { if (is) this.draw(); } },

  methods: {
    out() {
      return new Promise((resolve) => {
        // Server out, then laptop staggered
        this.$refs.server.out();
        setTimeout(() => { this.$refs.laptop.out().then(resolve); }, 90);
      });
    },
    in() {
      return new Promise((resolve) => {
        // Laptop in, then server staggered
        this.$refs.laptop.in();
        setTimeout(() => { this.$refs.server.in().then(resolve); }, 50);
      });
    },

    addRow() {
      const row = [];
      const horizGap = 4 * this.dpr;
      const indent = (15 + Math.round(Math.random()) * 20) * this.dpr;
      for (let i = 0; i < Math.floor(Math.random() * 5 + 1); i += 1) {
        const newX = indent + row.map(block => block.width + horizGap).reduce((a, b) => a + b, 0);
        const width = Math.floor(Math.random() * 50 + 5) * this.dpr;
        row.push(new CodeBlock(newX, width, this.$refs.canvas));
      }
      this.rows.push(row);
    },

    draw() {
      const { canvas } = this.$refs;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bottomRow = this.rows.slice(-1)[0];

      this.rows = this.rows.filter(r => !r[0].offScreen);
      const gap = 5 * this.dpr;
      if (!bottomRow || bottomRow[0].y < canvas.height - (CodeBlock.height + gap)) this.addRow();
      [].concat(...this.rows).forEach(b => b.draw(this.ctx));

      if (this.running) requestAnimationFrame(() => this.draw());
    },
  },

  components: {
    laptop: require('../_laptop/laptop.js').default,
    server: require('../_server/server.vue').default,
  },
};
