const sassLengthVariable = 300; const sassUnit = 'px';
const sassWidthVariable = sassLengthVariable * (5 / 7);
const sassHeightVariable = (sassLengthVariable / 50); // eslint-disable-line no-unused-vars

// Add a default suffix to a value that might or might not already have a suffix
function suffix(val, suf) {
  if (typeof val === 'string' && val.match(/[^0-9.]/)) return val; // If it's not just numbers, assume it already has a suffix
  return `${val}${suf}`; // Otherwise add the given suffix
}
function px(val) { return suffix(val, 'px'); } // Give values a default unit of 'px'
function deg(val) { return suffix(val, 'deg'); } // Give values a default unit of 'deg'
function secs(val) { return suffix(val, 's'); } // Give values a default unit of 's'


export default {
  props: {
    transitionTime: { type: Number, default: 0.5 },
    transitionEasing: { type: String, default: 'ease' },

    rotateX: { type: null, default: 0 },
    rotateY: { type: null, default: 0 },
    rotateZ: { type: null, default: 0 },
    translateX: { type: null, default: 0 },
    translateY: { type: null, default: 0 },
    translateZ: { type: null, default: 0 },

    lidAngle: { type: Number, default: 90 },

    typing: { type: Boolean, default: false },
  },

  data: () => ({
    mouseX: 0,
    mouseY: 0,
  }),

  created() {
    this.onMouseMove = (e) => {
      this.mouseX = e.clientX; this.mouseY = e.clientY;
    };
    window.addEventListener('mousemove', this.onMouseMove);
  },
  destroyed() { window.removeEventListener('mousemove', this.onMouseMove); },


  computed: {
    laptopStyle() {
      const mousePosFromCenter = [
        this.mouseX - (window.innerWidth / 2), this.mouseY - (window.innerHeight / 2),
      ];
      return {
        transform: [
          `rotateX(${-mousePosFromCenter[1] / window.innerHeight * 10}deg)`,
          `rotateY(${mousePosFromCenter[0] / window.innerWidth * 10}deg)`,
          'translateX(-40%) translateY(-15%) rotateX(60deg) rotateY(0deg) rotateZ(-45deg)',
        ].join(' '),
      };
    },

    wrapperStyle() {
      return {
        transform: [
          `rotateX(${deg(this.rotateX)})`,
          `rotateY(${deg(this.rotateY)})`,
          `rotateZ(${deg(this.rotateZ)})`,
          `translateX(${px(this.translateX)})`,
          `translateY(${px(this.translateY)})`,
          `translateZ(${px(this.translateZ)})`,
        ].join(' '),
        transition: `transform ${secs(this.transitionTime)} ${this.transitionEasing}`,
      };
    },

    lidStyle() {
      return {
        transform: `translateY(${suffix(sassWidthVariable * -2, sassUnit)}) rotateX(${deg(-180 + this.lidAngle)})`,
        transition: `transform ${secs(this.transitionTime)} ${this.transitionEasing}`,
      };
    },

  },
};
