<template>
  <div id="app">
    <nav>
      <div class="main__navigation">
        <div v-if="!this.$store.getters.getToken" class="before__authenticate">
          <router-link to="/sign-up">Register</router-link>
          <router-link to="/login">Login</router-link>
        </div>
        <div v-else>
          <router-link to="/upload"> Upload video</router-link>
          <router-link to="/videos"> Video </router-link>
          <a v-on:click="logout()"> Logout </a>
        </div>
      </div>
    </nav>
    <div class="main__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        token: ''
      }
    },
    created() {
      this.$store.commit('setToken', localStorage.getItem('token'));
    },
    methods: {
      logout() {
        localStorage.setItem('token', '')
        this.$store.commit('setToken', '');
        this.$router.push('/login')
      }
    }
  }

</script>
<style lang="scss">

  body {
    margin: 0px;
    font-size: 16px;
  }
  .main__navigation {
    display: flex;
    background-color: rgba(137, 197, 245, 1);
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;

    .before__authenticate {
      display: flex;
      width: 100%;
    }

    a {
      text-decoration: none;
      color: #fff;
      font-size: 1.25rem;
      margin-right: 10px;
    }
  }
  .main__content {
    padding: 30px;
  }
  h1, h2, h3, h4, h5, h6, {
    margin: 0px;
    padding: 0px;
  }
  input {
    outline: none;
  }
</style>
