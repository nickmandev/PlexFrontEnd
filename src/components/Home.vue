<template>
  <div id="home">
    <div>
      <h1>Welcome</h1>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HomeComponent',
    data() {
      return {
      }
    },
    methods: {
      logout() {
        localStorage.setItem('token', '')
        this.$router.push('/login')
      }
    }
  }

</script>
