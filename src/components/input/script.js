export default {
  props: {
    value: String,

    title: String,
    name: String,
    placeholder: String,
    type: { type: String, default: 'text' },
    disableAutocomplete: { type: Boolean, default: false },
    message: String,
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
