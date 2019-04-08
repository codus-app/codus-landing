import auth from '../../../auth';


export default {
  data: () => ({
    page: 1,

    email: '',
    password: '',
    username: '',
    name: '',
    role: '',

    errors: [],

    mode: 'signup',
    mainPageValid: false,
    page2Valid: false,
  }),

  components: {
    'main-page': require('./pages/main/main.vue').default,
    'role-select-page': require('./pages/signup-role/role-select.vue').default,
    'final-signup-page': require('./pages/finish-signup/finish-signup.vue').default,
  },

  computed: {
    buttonText() {
      if (this.page === 1) return this.mode === 'login' ? 'Log in' : 'Continue';
      if (this.page === 2) return 'Continue';
      return 'Sign up';
    },

    roleSelected() { return !!this.role; },
  },

  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        // Log in
        if (this.page === 1 && this.mode === 'login') {
          auth.login(this.email, this.password)
            .catch((err) => {
              // Email was already confirmed, so password has to eb the thing that's wrong
              if (err.code === 'access_denied') this.errors = [{ key: 'password', message: 'Wrong password.' }];
              reject();
            });
        }

        // Sign up page 1; move to next page
        if (this.page === 1 && this.mode === 'signup') {
          setTimeout(() => {
            this.page = 2;
            resolve();
          }, 400); // Load while text changes
        }

        // Sign up page 2; move to final page
        if (this.page === 2) {
          setTimeout(() => {
            this.page = 3;
            resolve();
          }, 400);
        }

        // Sign up page 3; signup is complete; submit
        if (this.page === 3) {
          // eslint-disable-next-line object-curly-newline
          const { email, password, username, name, role } = this;
          auth.signup(email, password, username, name, role)
            .catch((e) => {
              this.errors = e;
              // Go back if the email or password was wrong
              if (this.getError('email') || this.getError('password')) this.page = 1;
              reject();
            });
        }
      });
    },

    // Get the first server-side error for any field
    getError(searchKey) { return (this.errors.find(({ key }) => key === searchKey) || { message: '' }).message; },
    // Clear all server-side errors for any field
    clearErrors(searchKey) { this.errors = this.errors.filter(({ key }) => key !== searchKey); },
  },

  // Clear server-side errors when that field is modified
  watch: {
    email() { this.clearErrors('email'); },
    password() { this.clearErrors('password'); },
    username() { this.clearErrors('username'); },
    name() { this.clearErrors('name'); },
  },
};
