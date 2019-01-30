import { debounce } from 'debounce';
import isEmail from 'validator/lib/isEmail';

import auth from '../../auth';

export default {
  data: () => ({
    email: '',
    password: '',
    showEmailValidation: false,

    error: null,
    resetting: null,
  }),

  computed: {
    emailValid() { return isEmail(this.email); },
    emailStatus() { return (this.error || (this.showEmailValidation && !this.emailValid)) ? 'failure' : 'neutral'; },
    emailMessage() { return (this.showEmailValidation && !this.emailValid) ? 'Invalid email' : ''; },

    passwordStatus() { return this.error ? 'failure' : 'neutral'; },
    passwordMessage() { return this.error || ''; },

    canSubmit() {
      // Check that we're not actively displaying an email validation error
      return !(this.showEmailValidation && !this.emailValid)
        // No server-side errors
        && !this.error;
    },
  },

  watch: {
    email() {
      this.debouncedSEV();
      this.error = null;
    },
    password() { this.error = null; },
  },

  methods: {
    debouncedSEV: debounce(function sev() { this.showEmailValidation = true; }, 750),
    async passwordReset() {
      this.resetting = true;
      await auth.requestPasswordReset(this.email);
      this.resetting = false;
    },

    submit() {
      return new Promise((resolve, reject) => {
        auth.login(this.email, this.password)
          .catch((err) => {
            if (err.code === 'access_denied') this.error = 'Invalid username or password.';
            reject();
          });
      });
    },
  },
};
