export default {
  props: {
    items: Array,
    value: Number, // Selected index
  },

  methods: {
    switch(index) { this.$emit('input', index); },
  },
};
