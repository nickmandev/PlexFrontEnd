<template>
  <div id="login">
    <div v-if="message">{{this.message}}</div>
    <form v-on:submit.prevent="login">
      <div class="login-form-container">
        <div class="login-fields">
          <input type="text" name="email-username" placeholder="Enter Username or Email" v-model="user.username">
        </div>
        <div class="login-fields">
          <input type="password" name="password" placeholder="Enter password" v-model="user.password">
        </div>
        <button class="submit-btn" type="submit">Login</button>
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
  .login-form-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .login-fields input {
    border: none;
    border-bottom: 1px solid #89c5f5;
    width: 200px;
    background-color: #fff;
    font-size: 14px;
    height: 20px;
    color: #ddd;
    text-align: center;
  }
  .login-fields input::placeholder {
    color: #89c5f5;
    text-align: center;
  }

</style>
