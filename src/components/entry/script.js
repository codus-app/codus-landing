import auth from '../../auth';


export default {
  data: () => ({
    email: '',
    password: '',

    mode: '',
    mainPageValid: false,
  }),

  components: {
    'main-page': require('./pages/main/main.vue').default,
  },


  methods: {
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
};
