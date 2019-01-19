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
        opacity: 1,
      },
    };
  },

  methods: {
    getTransform() { return `translateX(${(containerWidth / 4) * -this.position}px)`; },
  },

  watch: {
    position(newPos, oldPos) {
      this.style.transform = this.getTransform();

      // If we're switching from one side to the other, do it in SECRET
      if (Math.sign(newPos) && Math.sign(oldPos) && Math.sign(newPos) !== Math.sign(oldPos)) {
        this.style.opacity = 0;
        setTimeout(() => { this.style.opacity = 1; }, 350);
      }
    },
  },

};
