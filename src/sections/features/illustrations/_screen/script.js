function suffix(val, suf) {
  if (typeof val === 'string' && val.match(/[^0-9.]/)) return val; // If it's not just numbers, assume it already has a suffix
  return `${val}${suf}`; // Otherwise add the given suffix
}
function px(val) { return suffix(val, 'px'); } // Give values a default unit of 'px'
function deg(val) { return suffix(val, 'deg'); } // Give values a default unit of 'deg'
function secs(val) { return suffix(val, 's'); } // Give values a default unit of 's'

export default {
  props: { initialVisibleState: Boolean },

  data: () => ({
    transitionTime: 0.5,
    transitionEasing: 'ease',
    opacity: 1,

    translateZ: 0,
    rotateZ: 0,
    rotateX: 0,
  }),

  created() {
    if (!this.initialVisibleState) this.out();
  },

  computed: {
    wrapperStyle() {
      return {
        transform: [
          `translateZ(${px(this.translateZ)})`,
          `rotateZ(${deg(this.rotateZ)})`,
          `rotateX(${deg(this.rotateX)})`,
        ].join(' '),
        transition: `transform ${secs(this.transitionTime)} ${this.transitionEasing}`,
      };
    },
    style() { return { opacity: this.opacity, transition: `opacity ${secs(this.transitionTime)} ${this.transitionEasing}` }; },
  },

  methods: {
    async out(duration = 0.35) {
      this.$emit('animationstart');

      Object.assign(this, {
        transitionTime: duration,
        transitionEasing: 'ease-in',
        opacity: 0,
        rotateZ: 135,
        translateZ: -400,
      });

      await new Promise(resolve => setTimeout(resolve, duration * 1000));
      this.$emit('animationend');
    },

    async in(duration = 1) {
      this.$emit('animationstart');
      // Set initial position
      Object.assign(this, {
        transitionTime: 0,
        opacity: 1,
        rotateX: -35,
        rotateZ: -150,
        translateZ: -650,
      });
      // Wait for CSS to be applied
      await this.$nextTick();
      await new Promise(resolve => setTimeout(resolve, 20)); // Safari & firefox need extra time
      // Transition up
      Object.assign(this, {
        transitionTime: duration,
        transitionEasing: 'ease',
        rotateX: 0,
        rotateZ: 0,
        translateZ: 0,
      });
      await new Promise(resolve => setTimeout(resolve, duration * 1000));
      this.$emit('animationend');
    },
  },
};
