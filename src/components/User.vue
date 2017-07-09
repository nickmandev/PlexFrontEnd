<template>
  <div>
    <h1>{{ params.name }} </h1>
    <videos v-bind:userVideos="videos"></videos>
  </div>
</template>

<script>
import { VideoModel } from '../models/VideoModel';
  export default {
    name: 'UserComponent',
    data() {
      return {
        params: {},
        videos: []
      }
    },
    created() {
      this.params = this.$route.params
      this.$http.get(`collection/${this.params.name}`).then((res) => {
        res.body.data.forEach((video) => {
          this.videos.push(new VideoModel(video));
        });;
      });
    }
  }

</script>

<style>
@import '../assets/styles/variables.scss';
</style>
