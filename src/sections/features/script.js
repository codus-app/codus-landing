import items from './features-list';

export default {
  data: () => ({
    items,
    selectedIndex: 0,

    laptopPose: {},
    laptopTransition: [1],
    laptopOpacity: 1,
  }),

  computed: {
    laptopProps() {
      const { laptopTransition } = this;
      const [transitionTime, transitionEasing = 'ease'] = laptopTransition;
      return { ...this.laptopPose, transitionTime, transitionEasing };
    },
  },

  methods: {
    out(duration = 0.5) {
      this.laptopTransition = [duration, 'ease-in'];
      this.laptopOpacity = 0;
      this.laptopPose = {
        rotateZ: 135,
        lidAngle: 20,
        translateZ: -350,
      };
      return new Promise(resolve => setTimeout(resolve, duration * 1000));
    },

    async in(duration = 1) {
      // Set initial position
      this.laptopTransition = [0];
      this.laptopOpacity = 1;
      this.laptopPose = { rotateZ: -270, lidAngle: 0, translateZ: -500 };
      await this.$nextTick(); // Wait for CSS to be applied
      // Transition up
      this.laptopTransition = [duration];
      this.laptopPose = {};
      return new Promise(resolve => setTimeout(resolve, duration * 1000));
    },

    outQuick(duration = 0.25) {
      this.laptopTransition = [duration];
      this.laptopOpacity = 0;
      return new Promise(resolve => setTimeout(resolve, duration * 1000));
    },
  },

  components: {
    laptop3d: require('./illustrations/laptop/laptop.vue').default,
  },
};
