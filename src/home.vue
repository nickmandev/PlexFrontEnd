<template>
  <div id="home">
    <nav>
      <router-link to="/sign-up">Register</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <div>
      <h1>Welcome</h1>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    data() {
      return {
      }
    }
  }

</script>
