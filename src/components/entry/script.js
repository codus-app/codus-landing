import { debounce } from 'debounce';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';

import * as api from '../../api';
import auth from '../../auth';


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
    accountExists: null,
    lastCheckedEmail: null,
  }),


  computed: {
    mode() { return this.accountExists ? 'login' : 'signup'; },
    emailValid() { return isEmail(this.email); },
    passwordLengthValid() { return isByteLength(this.password, { min: 8 }); },

    emailStatus() { return (this.showEmailValidation && !this.emailValid) ? 'failure' : this.emailStatus2; },
    emailMessage() { return (this.showEmailValidation && !this.emailValid) ? 'Invalid email' : this.emailMessage2; },

    showPasswordValidation() { return this.mode === 'signup' && this.showPasswordValidation2; },
    passwordStatus() { return (this.showPasswordValidation && !this.passwordLengthValid) ? 'failure' : this.passwordStatus2; },
    passwordMessage() { return (this.showPasswordValidation && !this.passwordLengthValid) ? 'Must be at least 8 characters in length' : this.passwordMessage2; },

    buttonEnabled() {
      //     good email         email has been looked up and form has been placed in correct state
      return this.emailValid && this.email === this.lastCheckedEmail
        && this.password.length >= (this.mode === 'login' ? 1 : 8);
    },
  },


  methods: {
    async checkEmail() {
      this.showEmailValidation = true;

      if (this.emailValid && this.email !== this.lastCheckedEmail) {
        this.emailStatus2 = 'loading';
        const { exists, available } = await api.get({ endpoint: `/user-check/email/${this.email}` });
        this.emailStatus2 = available ? 'success' : 'neutral';
        this.accountExists = exists;
      }

      this.lastCheckedEmail = this.email;
    },

    debouncedCheckEmail: debounce(function checkEmail2() { this.checkEmail(); }, 750),

    debouncedPasswordValidate: debounce(function a() { this.showPasswordValidation2 = true; }, 750),

    submit() {
      return new Promise((resolve) => {
        // Log in
        if (this.mode === 'login') {
          auth.login(this.email, this.password)
            .catch((err) => {
              this.passwordStatus2 = 'failure';
              if (err.code === 'access_denied') { this.passwordMessage2 = 'Wrong password.'; } // Email was already confirmed
              resolve(); // stop spinning (even though login failed)
            });

        // Continue to the next page of signup
        } else {
          console.log('yeet');
          resolve();
        }
      });
    },
  },


  watch: {
    email() {
      this.debouncedCheckEmail();
      this.emailStatus2 = 'neutral';
      this.accountExists = null;
      this.lastCheckedEmail = null;
    },

    password() { this.debouncedPasswordValidate(); },
  },
};
