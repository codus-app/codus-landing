export default {
  props: {
    value: String,

    title: String,
    name: String,
    placeholder: String,
    message: String,
    type: { type: String, default: 'text' },
    autofill: { type: Boolean, default: false },
    status: {
      type: String,
      validator: value => ['neutral', 'success', 'failure', 'loading'].includes(value),
      default: 'neutral',
    },
    theme: {
      type: String,
      validator: value => ['light', 'dark'].includes(value),
      default: 'dark',
    },
  },

  methods: {
    onInput(e) { this.$emit('input', e.target.value); },
  },
};
