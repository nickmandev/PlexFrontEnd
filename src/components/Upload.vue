<template>
  <vue-clip :options="options">
    <template slot="clip-uploader-action">
      <div>
        <div class="dz-message"><h2> Click or Drag and Drop files here upload </h2></div>
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
