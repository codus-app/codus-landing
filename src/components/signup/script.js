/* global CODUS_ENGINE_URL */
import auth from '../../auth';


export default {
  data: () => ({
    name: '',
    email: '',
    username: '',
    password: '',
    errors: [],
  }),

  methods: {
    signup() {
      fetch(`${CODUS_ENGINE_URL}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
        }),
      })
        .then(r => r.json())
        .then(({ data, error }) => {
          if (error) this.errors = error;
          else auth.login(data.username, this.password);
        });
    },
  },

  mounted() {
    this.$el.getElementsByTagName('input')[0].focus();
  },
};
