export default {
  props: {
    items: Array,
    value: Number, // Selected index
  },

  methods: {
    change(index) { this.$emit('input', index); },
  },
};
