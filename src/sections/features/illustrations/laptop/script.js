const sassLengthVariable = 300; const sassUnit = 'px';
const sassWidthVariable = (sassLengthVariable / 3) * 2;
const sassHeightVariable = (sassLengthVariable / 50); // eslint-disable-line no-unused-vars

export default {
  props: {
    transitionTime: { type: Number, default: 0.5 },

    rotateX: { type: String, default: '0' },
    rotateY: { type: String, default: '0' },
    rotateZ: { type: String, default: '0' },
    translateX: { type: String, default: '0' },
    translateY: { type: String, default: '0' },
    translateZ: { type: String, default: '0' },

    lidAngle: { type: String, default: '100deg' },
  },

  computed: {
    wrapperStyle() {
      return {
        transform: [
          `rotateX(${this.rotateX})`,
          `rotateY(${this.rotateY})`,
          `rotateZ(${this.rotateZ})`,
          `translateX(${this.translateX})`,
          `translateY(${this.translateY})`,
          `translateZ(${this.translateZ})`,
        ].join(' '),
        transition: `transform ${this.transitionTime}s`,
      };
    },

    lidStyle() {
      return {
        transform: `translateY(-${sassWidthVariable * 2}${sassUnit}) rotateX(${-180 + this.lidAngle}deg)`,
        transition: `transform ${this.transitionTime}s`,
      };
    },

  },
};
