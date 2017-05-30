<template>
  <vue-clip :options="options">
    <template slot="clip-uploader-action">
      <div>
        <h1> Click on the button to start uploading. </h1>
        <button class="btn-main dz-message"> Click </button>
      </div>
    </template>
  </vue-clip>
</template>
<script>
  export default {
    name: 'upload',
    data() {
      return {
        options: {
          url: 'http://localhost:3000/videos',
          paramName: 'video',
          headers: {
            Authorization: this.$store.getters.getToken
          }
        }
      }
    }
  }

</script>
<style>

</style>
