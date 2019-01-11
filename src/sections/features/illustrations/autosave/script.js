const colors = [
  '#8fbcbb',
  '#88c0d0',
  '#81a1c1',
  '#5e81ac',
  '#4c566a',
  '#2e3440',
];
const fps = 60;
const delay = 1000 / fps;


/* eslint-disable lines-between-class-members */
class CodeBlock {
  static get height() { return 6 * window.devicePixelRatio; }
  static get speed() { return 100 * window.devicePixelRatio; }

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
    ctx.fillRect(this.x, this.y, this.width, CodeBlock.height);
  }
}


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
    this.rows = [];
    this.addRow();
    this.$refs.canvas.width = this.$refs.canvas.offsetWidth * window.devicePixelRatio;
    this.$refs.canvas.height = this.$refs.canvas.offsetHeight * window.devicePixelRatio;

    this.start();
  },

  methods: {
    out() { return this.$refs.laptop.out(); },
    in() { return this.$refs.laptop.in(); },
    outQuick() { return this.$refs.laptop.outQuick(); },

    start() { this.interval = setInterval(() => requestAnimationFrame(() => this.draw()), delay); },
    stop() { clearInterval(this.interval); },

    addRow() {
      const row = [];
      const dpr = window.devicePixelRatio;
      const horizGap = 4 * dpr;
      const indent = (15 + Math.round(Math.random()) * 20) * dpr;
      for (let i = 0; i < Math.floor(Math.random() * 5 + 1); i += 1) {
        const newX = indent + row.map(block => block.width + horizGap).reduce((a, b) => a + b, 0);
        const width = Math.floor(Math.random() * 50 + 5) * dpr;
        row.push(new CodeBlock(newX, width, this.$refs.canvas));
      }
      this.rows.push(row);
    },

    draw() {
      const { canvas } = this.$refs;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bottomRow = this.rows.slice(-1)[0];

      this.rows = this.rows.filter(r => !r[0].offScreen);
      const gap = 5 * window.devicePixelRatio;
      if (!bottomRow || bottomRow[0].y < canvas.height - (CodeBlock.height + gap)) this.addRow();
      [].concat(...this.rows).forEach(b => b.draw(this.ctx));
    },
  },

  components: { laptop: require('../_laptop/laptop.js').default },
};
