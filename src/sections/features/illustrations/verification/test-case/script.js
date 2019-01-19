const containerWidth = 286;

export default {
  props: {
    success: { type: Boolean, default: null }, // true is sucess, false is failure, null is neutral
    position: { type: Number, default: 0 },
  },

  data: function data() {
    return {
      style: {
        transform: this.getTransform(),
        transitionDuration: '0.35s',
      },
    };
  },

  methods: {
    getTransform() { return `translateX(${(containerWidth / 4) * this.position}px)`; },
  },

  watch: {
    position(newPos, oldPos) {
      this.style.transform = this.getTransform();

      // If we're switching from one side to the other, don't transition
      if (Math.sign(newPos) && Math.sign(oldPos) && Math.sign(newPos) !== Math.sign(oldPos)) {
        this.style.transitionDuration = '0s';

        // Set transition duration back
        this.$nextTick()
          .then(() => setTimeout(() => {
            this.style.transitionDuration = '0.35s';
          }, 40));
      }
    },
  },

};
