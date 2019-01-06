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
    down() {
      this.laptopTransition = [0.5, 'ease-in'];
      this.laptopOpacity = 0;
      this.laptopPose = {
        rotateZ: 135,
        lidAngle: 20,
        translateZ: -350,
      };
    },

    async up() {
      this.laptopTransition = [0];
      this.laptopOpacity = 1;
      this.laptopPose = { rotateZ: -270, lidAngle: 0, translateZ: -500 };
      await this.$nextTick();
      this.laptopTransition = [1];
      this.laptopPose = {};
    },
  },

  components: {
    laptop3d: require('./illustrations/laptop/laptop.vue').default,
  },
};
