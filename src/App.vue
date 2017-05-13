<template>
  <div id="app">
    <nav>
      <div v-if="!this.$store.getters.getToken">
        <router-link to="/sign-up">Register</router-link>
        <router-link to="/login">Login</router-link>
      </div>
      <div v-else>
        <router-link to="/upload">Upload video</router-link>
        <router-link to="/videos"> Videos </router-link>
        <a v-on:click="logout()">Logout</a>
      </div>
    </nav>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
      }
    },
    methods: {
      logout() {
        this.$store.commit('setToken', '')
        this.$router.push('/login')
      }
    }
  }

</script>


<style>

</style>
