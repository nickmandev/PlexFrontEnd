<template>
  <div>
    <h1>{{ params.name }} </h1>
    <videos v-bind:userVideos="videos"></videos>
  </div>
</template>

<script>
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
        this.videos = res.body.data;

        this.videos.forEach((ele) => {
          ele.video_data = JSON.parse(ele.video_data);
          ele.user_info = JSON.parse(ele.user_info);
        });
      });
    }
  }

</script>

<style>

</style>
