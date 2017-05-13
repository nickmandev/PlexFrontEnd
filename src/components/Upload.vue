<template>
  <div>
    <h1>Hello from Upload!</h1>
    <vue-clip :options='options'>
      <template slot='clip-uploader-action'>
        <div>
          <div class="dz-message">
            <h2>Click to upload file</h2>
          </div>
        </div>
      </template>

      <template slot='clip-uploader-body' scope='props'>
        <div v-for='file in props.files'>
          <p v-if="file.status"> {{ file.name }} was successfully uploaded. </p>
          <p v-else> {{ file.name }} was not uploaded. </p>
        </div>
      </template>
    </vue-clip>
  </div>
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
    },

    methods: {
      uploadFile() {

      }
    }
  }

</script>
<style>

</style>
