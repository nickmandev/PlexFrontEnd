<template>
  <div>
    <div class="">
      <input name="name" v-model="name" type="text">
    </div>
    <div class="">
      <input name="email" v-model="email" type="text">
    </div>
    <div class="">
      <input name="password" v-model="password" type="password">
    </div>
    <div class="">
      <input name="confirm_password" v-model="confirm_password" type="password">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>