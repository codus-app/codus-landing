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
      return this.emailValid && !['loading', 'failure'].includes(this.emailStatus)
        && this.passwordLengthValid && this.passwordStatus !== 'failure';
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

    submit() {
      return new Promise((resolve) => {
        if (this.mode === 'login') {
          auth.login(this.email, this.password)
            .catch((err) => {
              this.passwordStatus2 = 'failure';
              this.passwordMessage2 = err.description;
              resolve(); // stop spinning (even though login failed)
            });
        } else {
          console.log('yeet');
        resolve();
        }
      });
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
