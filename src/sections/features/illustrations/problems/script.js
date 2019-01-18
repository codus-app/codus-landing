const colors = [
  'rgba(61, 229, 137, .75)', // green
  '#232327', '#232327', '#232327', '#232327', // gray (multiple for increased selection chance)
];

const dpr = window.devicePixelRatio;

// From https://stackoverflow.com/a/7838871/4414003
CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  this.fill();
  return this;
};

/* eslint-disable lines-between-class-members */
const numCols = 5;
class Problem {
  static get speed() { return 75 * dpr; }
  static get gap() { return 10 * dpr; }
  get width() { return (this.canvas.width - ((numCols + 1) * Problem.gap)) / numCols; }
  get height() { return this.width / 3 * 2; }

  constructor(index, canvas, blank = false) {
    this.canvas = canvas;
    this.index = index;
    this.startTime = new Date();
    this.color = blank
      ? 'transparent'
      : colors[Math.floor(Math.random() * colors.length)];
  }

  get delta() { return (new Date() - this.startTime) / 1000; }
  get x() { return Problem.gap + (this.index * (Problem.gap + this.width)); }
  get y() { return this.canvas.height - this.delta * Problem.speed; }
  get offScreen() { return this.y < -this.height; }

  draw(ctx) {
    ctx.fillStyle = this.color;
    // const progress = (this.canvas.height - this.y) / this.canvas.height;
    // ctx.globalAlpha = Math.max(Math.min((-5 * Math.abs(progress - 0.45)) + 2.75, 1), 0);
    ctx.roundRect(this.x, this.y, this.width, this.height, 3.5 * dpr);
  }
}


export default {
  props: {
    initialVisibleState: Boolean,
  },

  data: () => ({
    ctx: undefined,
    running: true,
    rowCount: 0,
  }),

  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
    this.rows = [
      new Array(numCols).fill(null).map((_, i) => new Problem(i, this.$refs.canvas)),
    ];
    this.rowCount = 1;
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
      const bottomRow = this.rows.slice(-1)[0];

      this.rows = this.rows.filter(r => !r[0].offScreen);
      // Add row
      if (!bottomRow || bottomRow[0].y < canvas.height - (bottomRow[0].height + Problem.gap)) {
        this.rowCount += 1;
        // Ever 5 rows is a "blank" row
        if (this.rowCount % 5 === 0) this.rows.push([new Problem(0, this.$refs.canvas, true)]);
        else {
          this.rows.push(new Array(numCols).fill(null)
            .map((_, i) => new Problem(i, this.$refs.canvas)));
        }
      }
      [].concat(...this.rows).forEach(b => b.draw(this.ctx));

      if (this.running) requestAnimationFrame(() => this.draw());
    },
  },

  components: { laptop: require('../_laptop/laptop.js').default },
};
