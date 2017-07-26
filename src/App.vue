<template>
  <div id="main">
    <nav>
      <div class="main__navigation">
        <div v-if="!this.$store.getters.getToken" class="before-authenticate">
          <router-link to="/sign-up">Register</router-link>
          <router-link to="/login">Login</router-link>
        </div>
        <div class="after-authenticate" v-else>
          <router-link to="/upload"> Upload video</router-link>
          <router-link to="/videos"> Videos </router-link>
          <router-link to="/profile"> Profile </router-link>
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

  require('./assets/styles/main.scss')
  export default {
    name: 'Main',
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
<style>

  .main__navigation {
    display: flex;
    background-color: #424242;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .main__content .before__authenticate {
    display: flex;
    width: 100%;
  }

  .main__content {
    padding: 30px;
  }
  .before-authenticate a {
    text-decoration: none;
    color: #fff;
    font-size: 1.25rem;
    margin-right: 0.625rem;

  }
  .after-authenticate {
    display: flex;
    width: 100%;
  }
  .after-authenticate a {
    text-decoration: none;
    color: #fff;
    font-size: 1.25rem;
    margin-right: 10px;
  }
  .after-authenticate a:last-child {
    cursor: pointer;
    margin-left: auto;
  }

</style>
