import { debounce } from 'debounce';
import isEmail from 'validator/lib/isEmail';
import isByteLength from 'validator/lib/isByteLength';

// import * as api from '../../api';
import auth from '../../../auth';


export default {
  data: () => ({
    page: 1,

    role: '',
    email: '',
    username: '',
    name: '',
    password: '',

    showEmailValidation: false,
    showUsernameValidation: false,
    showNameValidation: false,
    showPasswordValidation: false,

    errors: [],
  }),

  computed: {
    // Email
    emailValid() { return isEmail(this.email); },
    emailStatus() {
      return this.getError('email') || (this.showEmailValidation && !this.emailValid)
        ? 'failure'
        : 'neutral';
    },
    emailMessage() {
      return (this.showEmailValidation && !this.emailValid)
        ? 'Invalid email'
        : this.getError('email');
    },

    // Username
    usernameLengthValid() { return isByteLength(this.username, { min: 1, max: 15 }); },
    usernameCharsValid() { return !this.username.match(/[^a-z0-9_]/); },
    usernameValid() { return this.usernameLengthValid && this.usernameCharsValid; },
    usernameStatus() {
      if (this.getError('username')) return 'failure';
      if (!this.showUsernameValidation) return 'neutral';
      // Fail if basic validation fails
      if (!this.usernameValid) return 'failure';
      return 'neutral';
    },
    usernameMessage() {
      if (this.getError('username')) return this.getError('username'); // Any server-side errors
      if (!this.showUsernameValidation) return '';
      if (!this.usernameLengthValid) return 'Must be between 1 and 15 characters';
      if (!this.usernameCharsValid) return 'Must only contain lowercase letters, numbers, and underscores';
      return '';
    },

    // Display name
    nameLengthValid() { return isByteLength(this.name, { min: 1, max: 25 }); },
    nameStatus() {
      return (this.getError('name') || (this.showNameValidation && !this.nameLengthValid))
        ? 'failure'
        : 'neutral';
    },
    nameMessage() {
      if (this.getError('name')) return this.getError('name'); // Any server-side errors
      if (!this.showNameValidation) return '';
      if (!this.nameLengthValid) return 'Must be between 1 and 25 characters';
      return '';
    },

    // Password
    passwordLengthValid() { return isByteLength(this.password, { min: 8 }); },
    passwordStatus() { return (this.getError('password') || (this.showPasswordValidation && !this.passwordLengthValid)) ? 'failure' : 'neutral'; },
    passwordMessage() { return (this.showPasswordValidation && !this.passwordLengthValid) ? 'Must be at least 8 characters in length' : this.getError('password'); },

    canProceed() {
      /* eslint-disable max-len */
      return this.page === 1
        ? !!this.role
        : this.showEmailValidation && this.showUsernameValidation && this.showNameValidation && this.showPasswordValidation
          && [this.emailStatus, this.usernameStatus, this.nameStatus, this.passwordStatus].every(n => n !== 'failure');
      /* eslint-enable */
    },
  },

  watch: {
    email() {
      this.debouncedSEV();
      this.clearErrors('email');
    },
    username() {
      this.debouncedSUV();
      this.clearErrors('username');
    },
    name() {
      this.debouncedSNV();
      this.clearErrors('name');
    },
    password() {
      this.debouncedSPV();
      this.clearErrors('password');
    },
  },

  methods: {
    debouncedSEV: debounce(function sev() { this.showEmailValidation = true; }, 750),
    debouncedSUV: debounce(function suv() { this.showUsernameValidation = true; }, 750),
    debouncedSNV: debounce(function snv() { this.showNameValidation = true; }, 750),
    debouncedSPV: debounce(function spv() { this.showPasswordValidation = true; }, 750),

    proceed() {
      if (this.page === 1) return new Promise(resolve => setTimeout(() => { this.page = 2; resolve(); }, 400)); // eslint-disable-line max-len
      return this.submit();
    },

    submit() {
      return new Promise((resolve, reject) => {
        const { email, password, username, name, role } = this; // eslint-disable-line object-curly-newline, max-len
        auth.signup(email, password, username, name, role)
          .catch((e) => { this.errors = e; reject(); });
      });
    },
    // Get the first server-side error for any field
    getError(searchKey) { return (this.errors.find(({ key }) => key === searchKey) || { message: '' }).message; },
    // Clear all server-side errors for any field
    clearErrors(searchKey) { this.errors = this.errors.filter(({ key }) => key !== searchKey); },
  },

  components: {
    'role-select-page': require('../combined/pages/signup-role/role-select.vue').default,
  },
};
