import isEmail from 'validator/lib/isEmail';
export default {
  data: () => ({
    email: '',
    emailStatus2: 'neutral', // These get overriden when an email address is incorrectly formatted
    emailMessage2: '',

    password: '',

    showEmailValidation: false,
  }),
  computed: {
    emailValid() { return isEmail(this.email); },

    emailStatus() { return (this.showEmailValidation && !this.emailValid) ? 'failure' : this.emailStatus2; },
    emailMessage() { return (this.showEmailValidation && !this.emailValid) ? 'Invalid email' : this.emailMessage2; },

  },

  methods: {
    async checkEmail() {
      this.showEmailValidation = true;
    },
    },

  watch: {
    email() {
      this.emailStatus2 = 'neutral';
      this.accountExists = null;
      this.lastCheckedEmail = null;
    },
  },
};
