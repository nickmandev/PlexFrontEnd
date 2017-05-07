<template>
  <div>
    <form v-on:submit.prevent="login">
      <div>
        <label for="email-username"> Enter Username or Email </label>
        <input type="text" name="email-username" v-model="user.emailUsername">
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
    name: 'login',
    data() {
      return {
        user: {
          emailUsername: '',
          password: ''
        }
      }
    },

    methods: {
      login() {
        this.$http.post('sessions', { user: this.user }).then(function (response) {
          console.log(response);
        }), (error) => {
          console.log(error);
        }
      }
    }
  }

</script>
