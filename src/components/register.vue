<template>
  <div id="register">
    <div v-if="message">{{this.message}}</div>
    <form v-on:submit.prevent="register">
      <div class="authenticate-form-container">
        <div class="authenticate-fields">
          <input name="name" placeholder="Username" v-model="user.name" type="text">
        </div>
        <div class="authenticate-fields">
          <input name="email" placeholder="Email" v-model="user.email" type="text">
        </div>
        <div class="authenticate-fields">
          <input name="password"  placeholder="Password" v-model="user.password" type="password">
        </div>
        <div class="authenticate-fields">
          <input name="confirm_password" placeholder="Confirm Password" v-model="confirm_password" type="password">
        </div>
        <button class="btn-main">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import config from '../config/config';
  export default {
    name: 'RegisterComponent',
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
<style>
@import '../assets/styles/variables.scss';
</style>
