const sassLengthVariable = 300; const sassUnit = 'px';
const sassWidthVariable = (sassLengthVariable / 3) * 2;
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

    rotateX: { type: null, default: 0 },
    rotateY: { type: null, default: 0 },
    rotateZ: { type: null, default: 0 },
    translateX: { type: null, default: 0 },
    translateY: { type: null, default: 0 },
    translateZ: { type: null, default: 0 },

    lidAngle: { type: Number, default: 100 },
  },

  computed: {
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
        transition: `transform ${secs(this.transitionTime)}`,
      };
    },

    lidStyle() {
      return {
        transform: `translateY(${suffix(sassWidthVariable * -2, sassUnit)}) rotateX(${deg(-180 + this.lidAngle)})`,
        transition: `transform ${secs(this.transitionTime)}`,
      };
    },

  },
};
