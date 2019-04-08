import { debounce } from 'debounce';
import isEmail from 'validator/lib/isEmail';

import auth from '../../../auth';

export default {
  data: () => ({
    email: '',
    password: '',
    showEmailValidation: false,
    showPasswordValidation: false,

    error: null,
    resetting: null,
  }),

  computed: {
    emailValid() { return isEmail(this.email); },
    emailStatus() { return (this.error || (this.showEmailValidation && !this.emailValid)) ? 'failure' : 'neutral'; },
    emailMessage() { return (this.showEmailValidation && !this.emailValid) ? 'Invalid email' : ''; },

    passwordStatus() { return (this.error || (this.showPasswordValidation && !this.password)) ? 'failure' : 'neutral'; },
    passwordMessage() { return (this.showPasswordValidation && !this.password) ? 'Password is required' : (this.error || ''); },

    canSubmit() {
      // No errors
      return !this.emailMessage && !this.passwordMessage;
    },
  },

  watch: {
    email() {
      this.debouncedSEV();
      this.error = null;
    },
    password() { this.error = null; this.showPasswordValidation = true; },
  },

  methods: {
    debouncedSEV: debounce(function sev() { this.showEmailValidation = true; }, 750),
    async passwordReset() {
      this.resetting = true;
      await auth.requestPasswordReset(this.email);
      this.resetting = false;
    },

    submit() {
      this.showEmailValidation = true;
      this.showPasswordValidation = true;

      if (!this.canSubmit) {
        return Promise.resolve();
      }

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
