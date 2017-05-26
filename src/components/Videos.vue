<template>
  <div>
    <h1>Hello from videos </h1>
    <div>
      <ul>
        <li v-for="video in videos">
          <h1>{{ video.video_data.metadata}}</h1>
          <img v-on:click="openVideo(video)" :src="video.thumbnail_url">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Hls from 'hls.js'
  export default {
    name: 'VideosComponent',
    data() {
      return {
        videos: []
      }
    },
    created() {
      let token = this.$store.getters.getToken
      console.log(token);
      this.$http.get('videos', { headers: { 'Authorization': `${token}` } }).then((res) => {
        this.videos = res.body.data;
      })
    },
    methods: {
      openVideo(video) {
        let videoJson = JSON.stringify(video)
        localStorage.setItem('video', videoJson)
        this.$router.push(`/video/${video.id}`);
      }
    }


  }

</script>

<style>

</style>
