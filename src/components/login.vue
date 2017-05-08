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
    name: 'Login',
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
          response.body.auth_token ? this.message = "Logged in" : console.log('nah')
          this.$store.commit('setToken', response.body.auth_token)
          console.log(response)
        }), (error) => {
          this.message = "Wrong credentials"
        }
      }
    }
  }

</script>
