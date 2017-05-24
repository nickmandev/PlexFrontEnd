<template>
  <div id="login">
    <div v-if="message">{{this.message}}</div>
    <form v-on:submit.prevent="login">
      <div>
        <label for="email-username"> Enter Username or Email </label>
        <input type="text" name="email-username" v-model="user.username">
      </div>
      <div>
        <label for="password"> Enter password: </label>
        <input type="password" name="password" v-model="user.password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'LoginComponent',
    data() {
      return {
        user: {
          username: '',
          password: ''
        },
        message: ''
      }
    },

    methods: {
      login() {
        this.$http.post('authenticate', { user: this.user }).then(function (response) {
          if (response.body.error) {
            this.message = response.body.error.user_authenticate[0]
          } else {
            localStorage.setItem('token', response.body.auth_token)
            this.$store.commit('setToken', localStorage.getItem('token'))
            this.message = 'Logged in !'
            this.$router.push('/upload')
          }
        }), (error) => {
          this.message = "Something's wrong with the server!"
        }
      }
    }
  }

</script>
