import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';

export default {
  data: () => ({
    email: '',
    emailStatus2: 'neutral', // These get overriden when an email address is incorrectly formatted
    emailMessage2: '',

    password: '',
    passwordStatus2: 'neutral',
    passwordMessage2: '',

    showEmailValidation: false,
    showPasswordValidation2: false,
  }),
  computed: {
    emailValid() { return isEmail(this.email); },
    passwordLengthValid() { return isByteLength(this.password, { min: 8 }); },

    emailStatus() { return (this.showEmailValidation && !this.emailValid) ? 'failure' : this.emailStatus2; },
    emailMessage() { return (this.showEmailValidation && !this.emailValid) ? 'Invalid email' : this.emailMessage2; },

    passwordStatus() { return (this.showPasswordValidation && !this.passwordLengthValid) ? 'failure' : this.passwordStatus2; },
    passwordMessage() { return (this.showPasswordValidation && !this.passwordLengthValid) ? 'Must be at least 8 characters in length' : this.passwordMessage2; },
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
