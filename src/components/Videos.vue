<template>
  <div>
    <h1 class="videos-title">Videos</h1>
    <div class="videos-container">
      <div class="video-item" v-for="video in videos">
        <div class="video-item-thumbnail">
          <img :src="video.thumbnail_url">
          <div v-on:click="openVideo(video)" class="video-item-thumbnail-play">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </div>
        </div>
        <div class="video-info">
          <div class="video-item-name">
            <h4 v-on:click="openVideo(video)">{{ JSON.parse(video.video_data).filename | removeExtensions}}</h4>
          </div>
          <span class="video-info-uploader"><i class="fa fa-user-o" aria-hidden="true"></i> {{ JSON.parse(video.user_info) }}</span>
          <span class="video-info-duration"><i class="fa fa-clock-o" aria-hidden="true"></i> {{ (JSON.parse(video.video_data).duration / 60).toFixed(2) }} min</span>
        </div>
      </div>
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

<style lang="scss">
  @import '../assets/styles/main.scss';

  .videos-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
  }

  .videos-title {
    font-size: 1.875rem;
    text-align: center;
    color: $main-color;
    margin-bottom: 20px;
  }

  .video-item-thumbnail {
    position: relative;
  }

  .video-item-thumbnail img {
    width: 300px;
    height: 250px;
    position: relative;
  }

  .video-item-thumbnail-play {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 5px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
  }

  .video-item-thumbnail-play i {
    color: #fff;
    font-size: 2rem;
  }

  .video-item-thumbnail:hover .video-item-thumbnail-play {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .video-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #eaeaea;
    margin: 0px 20px;
    max-width: 300px;
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .video-item-name {
    font-size: 1.25rem;
    word-break: break-word;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    color: rgba(0, 0, 0, .54);
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .video-item-name h4 {
    cursor: pointer;
  }

  .video-info {
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
  }

  .video-info-uploader {
    color: rgba(0, 0, 0, .54);
  }

  .video-info-duration {
    color: rgba(0, 0, 0, .54);
    margin-left: auto;
  }
</style>
