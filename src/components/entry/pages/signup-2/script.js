import { debounce } from 'debounce';
import isByteLength from 'validator/lib/isByteLength';

import * as api from '../../../../api';

export default {
  data: () => ({
    username: '',
    usernameAvailable: null,
    usernameLoading: false,
    lastCheckedUsername: null,

    name: '',

    showUsernameValidation: false,
  }),

  props: ['usernameError', 'nameError'], // Server-side errors get passed in from outside

  computed: {
    // Username
    usernameLengthValid() { return isByteLength(this.username, { min: 1, max: 15 }); },
    usernameCharsValid() { return !this.username.match(/[^a-z0-9_]/); },
    usernameValid() { return this.usernameLengthValid && this.usernameCharsValid; },
    usernameStatus() {
      if (this.usernameError) return 'failure';
      if (!this.showUsernameValidation) return 'neutral';
      // Fail if basic validation fails
      if (this.username.length && (!this.usernameLengthValid || !this.usernameCharsValid)) return 'failure';
      // Neutral while typing; after stop, load until success/failure
      if (this.usernameLoading) return 'loading';
      if (this.username !== this.lastCheckedUsername) return 'neutral';
      return this.usernameAvailable ? 'success' : 'failure';
    },
    usernameMessage() {
      if (this.usernameError) return this.usernameError; // Any server-side errors
      if (!this.showUsernameValidation) return '';
      if (this.username.length && !this.usernameLengthValid) return 'Must be between 1 and 15 characters';
      if (!this.usernameCharsValid) return 'Must only contain lowercase letters, numbers, and underscores';
      if (this.username === this.lastCheckedUsername && !this.usernameLoading && this.usernameAvailable === false) return 'That username is taken!';
      return '';
    },

    // Display name
    nameLengthValid() { return isByteLength(this.name, { min: 1, max: 25 }); },
    nameStatus() { return (this.nameError || (this.name.length && !this.nameLengthValid)) ? 'failure' : 'neutral'; },
    nameMessage() {
      if (this.nameError) return this.nameError; // Any server-side errors
      if (this.name.length && !this.nameLengthValid) return 'Must be between 1 and 25 characters';
      return '';
    },

    canProceed() {
      return this.usernameValid // Good username
        && this.usernameAvailable // Available
        && this.username === this.lastCheckedUsername && !this.usernameLoading // Has been looked up
        && this.nameLengthValid // Name is fine
        && !this.usernameError && !this.nameError; // No server-side errors unaddressed
    },
  },

  methods: {
    async checkUsername() {
      this.showUsernameValidation = true;

      if (this.usernameValid && this.username !== this.lastCheckedUsername) {
        this.lastCheckedUsername = this.username;
        this.usernameLoading = true;
        const { available } = await api.get({ endpoint: `/user-check/username/${this.username}` });
        this.usernameLoading = false;
        this.usernameAvailable = available;
      }
    },
    debouncedCheckUsername: debounce(function checkUsername2() { this.checkUsername(); }, 750),
  },

  watch: {
    canProceed(canProceed) { this.$emit('validationchange', canProceed); },

    username(username) {
      this.$emit('usernamechange', username);

      this.usernameExists = null;
      this.lastCheckedUsername = null;
      this.debouncedCheckUsername();
    },
    name(name) {
      this.$emit('namechange', name);
    },
  },
};
