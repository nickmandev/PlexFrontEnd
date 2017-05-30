<template>
  <div id="login">
    <div v-if="message">{{this.message}}</div>
    <form v-on:submit.prevent="login">
      <div class="authenticate-form-container">
        <div class="authenticate-fields">
          <input type="text" name="email-username" placeholder="Enter Username or Email" v-model="user.username">
        </div>
        <div class="authenticate-fields">
          <input type="password" name="password" placeholder="Enter password" v-model="user.password">
        </div>
        <button class="btn-main" type="submit">Login</button>
      </div>
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

<style>

</style>
