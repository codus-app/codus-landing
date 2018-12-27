import { debounce } from 'debounce';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';

import * as api from '../../../../api';


export default {
  data: () => ({
    email: '',
    emailStatus2: 'neutral', // This gets overriden when an email address is incorrectly formatted

    password: '',

    showEmailValidation: false,
    showPasswordValidation2: false,
    accountExists: null,
    lastCheckedEmail: null,
  }),

  props: ['emailError', 'passwordError'],

  computed: {
    mode() { return this.accountExists ? 'login' : 'signup'; },

    emailValid() { return isEmail(this.email); },
    passwordLengthValid() { return isByteLength(this.password, { min: 8 }); },

    emailStatus() { return (this.emailError || (this.showEmailValidation && !this.emailValid)) ? 'failure' : this.emailStatus2; },
    emailMessage() { return (this.showEmailValidation && !this.emailValid) ? 'Invalid email' : this.emailError; },

    showPasswordValidation() { return this.mode === 'signup' && this.showPasswordValidation2; },
    passwordStatus() { return (this.passwordError || (this.showPasswordValidation && !this.passwordLengthValid)) ? 'failure' : 'neutral'; },
    passwordMessage() { return (this.showPasswordValidation && !this.passwordLengthValid) ? 'Must be at least 8 characters in length' : this.passwordError; },

    canProceed() {
      //     good email         email has been looked up
      return this.emailValid && this.email === this.lastCheckedEmail
        // Password must be 8 characters for new signups but we don't care if you already have a
        // password that's shorter somehow
        && this.password.length >= (this.mode === 'login' ? 1 : 8)
        // No server-side errors unaddressed
        && !this.emailError && !this.passwordError;
    },
  },

  watch: {
    // Pass some properties to parent
    mode(mode) { this.$emit('modechange', mode); },
    canProceed(canProceed) { this.$emit('validationchange', canProceed); },

    // Respond to changes in the value of text fields

    email(email) {
      this.$emit('emailchange', email);

      this.debouncedCheckEmail();
      this.emailStatus2 = 'neutral';
      this.accountExists = null;
      this.lastCheckedEmail = null;
    },

    password(password) {
      this.$emit('passwordchange', password);

      this.debouncedPasswordValidate();
    },
  },

  methods: {
    async checkEmail() {
      this.showEmailValidation = true;

      if (this.emailValid && this.email !== this.lastCheckedEmail) {
        this.lastCheckedEmail = this.email;
        this.emailStatus2 = 'loading';
        const { exists, available } = await api.get({ endpoint: `/user-check/email/${this.email}` });
        this.emailStatus2 = available ? 'success' : 'neutral';
        this.accountExists = exists;
      }
    },
    debouncedCheckEmail: debounce(function checkEmail2() { this.checkEmail(); }, 750),

    debouncedPasswordValidate: debounce(function a() { this.showPasswordValidation2 = true; }, 750),
  },
};
