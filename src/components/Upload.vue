<template>
  <div class="upload-wrapper">
    <upload
      message = "Click on the button to upload file."
      filter = "video/mp4,video/x-m4v,video/mkv,video/*"
      url="videos"
      :upload = "upload"
    ></upload>
    <button class="btn-main" v-on:click="upload = true">Upload</button>
  </div>
</template>
<script>
export default {
  name: 'upload-videos',
  data() {
    return {
      upload: false
    }
  }
}

</script>
