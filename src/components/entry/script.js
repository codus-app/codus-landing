import auth from '../../auth';


export default {
  data: () => ({
    page: 1,

    email: '',
    password: '',
    username: '',
    name: '',

    errors: [],

    mode: 'signup',
    mainPageValid: false,
    page2Valid: false,
  }),

  components: {
    'main-page': require('./pages/main/main.vue').default,
    'signup-page-2': require('./pages/signup-2/signup-2.vue').default,
  },

  computed: {
    buttonText() {
      if (this.page === 1) return this.mode === 'login' ? 'Log in' : 'Continue';
      return 'Sign up';
    },
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
            resolve();
            this.page = 2;
          }, 400); // Load while text changes
        }

        if (this.page === 2) {
          // eslint-disable-next-line object-curly-newline
          const { email, password, username, name } = this;
          auth.signup(email, password, username, name)
            .catch((e) => {
              this.errors = e;
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
