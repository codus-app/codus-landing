export default {
  template: `
    <div v-bind:style="{ opacity: laptopOpacity, transition: \`opacity \${laptopTransition[0]}s \${laptopTransition[1] || 'ease'}\` }">
      <laptop-marionette v-bind="laptopProps"><slot></slot></laptop-marionette>
    </div>
  `,

  data: () => ({
    laptopPose: {},
    laptopTransition: [1],
    laptopOpacity: 1,
  }),

  props: { initialVisibleState: Boolean, typing: Boolean },
  created() { if (!this.initialVisibleState) this.out(); },

  computed: {
    laptopProps() {
      const { laptopTransition, typing } = this;
      const [transitionTime, transitionEasing = 'ease'] = laptopTransition;
      return { ...this.laptopPose, transitionTime, transitionEasing, typing }; // eslint-disable-line object-curly-newline, max-len
    },
  },

  methods: {
    async out(duration = 0.35) {
      this.$emit('animationstart');
      this.laptopTransition = [duration, 'ease-in'];
      this.laptopOpacity = 0;
      this.laptopPose = {
        rotateZ: 135,
        lidAngle: 20,
        translateZ: -350,
      };
      await new Promise(resolve => setTimeout(resolve, duration * 1000));
      this.$emit('animationend');
    },

    async in(duration = 1) {
      this.$emit('animationstart');
      // Set initial position
      this.laptopTransition = [0];
      this.laptopOpacity = 1;
      this.laptopPose = { rotateZ: -270, lidAngle: 0, translateZ: -500 };
      // Wait for CSS to be applied
      await this.$nextTick();
      await new Promise(resolve => setTimeout(resolve, 20)); // Safari & firefox need extra time
      // Transition up
      this.laptopTransition = [duration];
      this.laptopPose = {};
      await new Promise(resolve => setTimeout(resolve, duration * 1000));
      this.$emit('animationstart');
    },

    async outQuick(duration = 0.25) {
      this.$emit('animationstart');
      this.laptopTransition = [duration];
      this.laptopOpacity = 0;
      await new Promise(resolve => setTimeout(resolve, duration * 1000));
      this.$emit('animationend');
    },
  },

  components: {
    'laptop-marionette': require('./laptop-marionette/laptop-marionette.vue').default,
  },
};
