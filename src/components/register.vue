<template>
  <div id="register">
    <div v-if="message">{{this.message}}</div>
    <form v-on:submit.prevent="register">
      <div class="">
        <label for="name">Username</label>
        <input name="name" v-model="user.name" type="text">
      </div>
      <div class="">
        <label for="email">Email</label>
        <input name="email" v-model="user.email" type="text">
      </div>
      <div class="">
        <label for="password">Password</label>
        <input name="password" v-model="user.password" type="password">
      </div>
      <div class="">
        <label for="confirm_password">Confirm Password</label>
        <input name="confirm_password" v-model="confirm_password" type="password">
      </div>
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
  import config from '../config/config';
  export default {
    name: 'Register',
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
        },
        confirm_password: '',
        message: ''
      }
    },

    methods: {
      register() {
        if (this.confirm_password === this.user.password && this.testEmail()) {
          this.$http.post('users', { user: this.user }).then(function (response) {
            this.message = response.body.message
          }), (error) => {
            console.log(error);
          }
        } else {
          this.message = "Password and Confirm password must be identical."
        }
      },
      testEmail() {
        if (config.emailRegEx.test(this.user.email)) {
          return true
        }
        return false
        this.message = 'Email is invalid'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
