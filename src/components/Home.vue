<template>
  <div id="home">
    <div class="greetings">
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
<style lang="scss">
  @import '../assets/styles/variables.scss';

  .greetings {
    color: $main-color;
    font-size: 1.5rem;
    text-align: center;
  }

</style>
