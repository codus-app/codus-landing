export default {
  props: {
    links: Array,
  },

  methods: {
    scrollToTop() { window.scroll({ top: 0, behavior: 'smooth' }); },
  },
};
