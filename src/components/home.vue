<template>
  <div>
    <nav>
      <router-link to="/sign-up">Register</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <div id="home">
      <h1>Welcome</h1>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data() {
      return {
      }
    }
  }

</script>
