export default {
  props: {
    links: Array,
  },

  methods: {
    scrollToTop() { window.scroll({ top: 0, behavior: 'smooth' }); },
    scrollToSection(target) {
      const target2 = target instanceof HTMLElement ? target : document.querySelector(target);
      if (target2) {
        window.scroll({
          top: Math.max(target2.getBoundingClientRect().top + window.scrollY - 60, 0),
          behavior: 'smooth',
        });
      }
    },
  },
};
