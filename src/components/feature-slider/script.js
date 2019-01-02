export default {
  props: {
    items: Array,
    value: Number, // Selected index
  },

  data: () => ({ mounted: false }),
  mounted() { this.mounted = true; },

  methods: {
    change(index) { this.$emit('input', index); },
  },

  computed: {
    thumbStyle() {
      if (!this.mounted) return {};

      const bounds = this.$refs.items[this.value].getBoundingClientRect();
      const trackBounds = this.$refs.track.getBoundingClientRect();

      const transform = [
        `translateY(${bounds.top - trackBounds.top - 3}px)`,
        `scaleY(${(bounds.height + 6) / 10})`,
      ].join(' ');
      return { transform };
    },
  },
};
