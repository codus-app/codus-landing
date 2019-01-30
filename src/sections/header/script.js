export default {
  props: {
    mode: { type: String, default: 'entry', validator: val => ['entry', 'login', 'signup'].includes(val) },
  },

  // Reactive window size
  data: () => ({ windowSize: [0, 0] }),
  methods: { onResize() { this.windowSize = [window.innerWidth, window.innerHeight]; } },
  created() { this.onResize(); window.addEventListener('resize', this.onResize); },
  destroyed() { window.removeEventListener('resize', this.onResize); },

  computed: {
    // Entry and signup forms appear to the left
    altLayout() { return this.mode !== 'entry'; },
    rightTransform() {
      (() => {})(this.windowSize);
      return this.altLayout
        ? `translateX(${this.$refs.left.getBoundingClientRect().left - this.$refs.form.$el.getBoundingClientRect().left}px)`
        : '';
    },
  },
};
