<template>
  <div id="videos">
    <h1 class="videos-title">Videos</h1>
    <div v-if="!userVideos" class="videos-container">
      <div class="video-item" v-for="video in videos">
        <div class="video-item-thumbnail">
          <img :src="video.thumbnail_url">
          <span class="video-info-duration">{{ video.video_data.duration | convertTime }} min</span>
          <div v-on:click="openVideo(video)" class="video-item-thumbnail-play">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </div>
        </div>
        <div class="video-info">
          <div>
            <h4 class="video-item-name" v-on:click="openVideo(video)">{{ video.video_data.filename | removeExtensions }}</h4>
          </div>
          <div class="video-item-info-row">
            <span v-on:click="goToUser(video)" class="video-info-uploader"><i class="fa fa-user-o" aria-hidden="true"></i> {{ video.user_info }}</span>
            <span class="video-info-views">Views: {{ video.view_count }}</span>
            <span v-if="video.created_at" class="video-info-uploaded-at">Uploaded: {{ video.created_at | dateParser }} </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userVideos" class="videos-container">
      <div v-for="video in userVideos" class="video-item">
        <div class="video-item-thumbnail">
          <img :src="video.thumbnail_url">
          <span class="video-info-duration">{{ video.video_data.duration | convertTime }} min</span>
          <div v-on:click="openVideo(video)" class="video-item-thumbnail-play">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </div>
        </div>
        <div class="video-info">
          <div>
            <h4 class="video-item-name" v-on:click="openVideo(video)">{{ video.video_data.filename | removeExtensions }}</h4>
          </div>
          <div class="video-item-info-row">
            <span v-on:click="goToUser(video)" class="video-info-uploader"><i class="fa fa-user-o" aria-hidden="true"></i> {{ video.user_info }}</span>
            <span class="video-info-views">Views: {{ video.view_count }}</span>
            <span v-if="video.created_at" class="video-info-uploaded-at">Uploaded: {{ video.created_at | dateParser }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Hls from 'hls.js'
  export default {
    name: 'Videos',
    props: ['userVideos'],
    data() {
      return {
        videos: []
      }
    },
    created() {
      this.$http.get('videos').then((res) => {
        this.videos = res.body.data;
        this.videos.forEach((ele) => {
          ele.video_data = JSON.parse(ele.video_data);
          ele.user_info = JSON.parse(ele.user_info);
        });
      })
    },
    methods: {
      openVideo(video) {
        let videoId = video.id;
        localStorage.setItem('videoId', videoId)
        this.$router.push(`/videos/${videoId}`);
      },
      goToUser(video) {
        let userId = video.user_id;
        this.$router.push({path: `user/${video.user_info}`, params: {test: userId}})
      }
    }


  }

</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  .videos-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
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
    height: 250px;
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
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    cursor: pointer;
  }

  .video-item-thumbnail:hover .video-info-duration {
    display: none;
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
    background-color: $main-color;
    margin: 20px;
    max-width: 300px;
    align-self: stretch;
    box-shadow: 0px 2px 1px 1px rgba(0, 0, 0, 0.2);
  }

  .video-item-name {
    font-size: 1.25rem;
    word-break: break-word;
    margin-bottom: 5px;
    width: 100%;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    cursor: pointer;
  }

  .video-info {
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    background-color: $main-color;
    color: #fff;
  }

  .video-info-duration {
    color: #fff;
    margin-left: auto;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2px;
    background-color: #000;
  }

  .video-info-views {
    margin-left: auto;
    flex: 1;
  }

  .video-info-uploader {
    flex: 1 1 100%;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .video-item-info-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
