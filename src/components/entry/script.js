import auth from '../../auth';


export default {
  data: () => ({
    page: 1,

    email: '',
    password: '',
    username: '',
    name: '',

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
      return new Promise((resolve) => {
        // Log in
        if (this.page === 1 && this.mode === 'login') {
          auth.login(this.email, this.password)
            .catch((err) => {
              this.passwordStatus2 = 'failure';
              if (err.code === 'access_denied') { this.passwordMessage2 = 'Wrong password.'; } // Email was already confirmed
              resolve(); // stop spinning (even though login failed)
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
          // sign up
        }
      });
    },
  },
};
