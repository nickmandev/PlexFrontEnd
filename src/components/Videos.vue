<template>
  <div id="videos">
    <h1 class="videos-title">Videos</h1>
    <div v-if="!userVideos" class="videos-container">
      <div class="video-item" v-for="video in videos" :key="video.id">
        <div class="video-item-thumbnail">
          <img :src="video.thumbnailUrl">
          <span class="video-info-duration">{{ video.videoData.duration | convertTime }} min</span>
          <div v-on:click="openVideo(video)" class="video-item-thumbnail-play">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </div>
        </div>
        <div class="video-info">
          <div>
            <h4 class="video-item-name" v-on:click="openVideo(video)">{{ video.videoData.filename | removeExtensions }}</h4>
          </div>
          <div class="video-item-info-row">
            <span v-on:click="goToUser(video)" class="video-info-uploader"><i class="fa fa-user-o" aria-hidden="true"></i> {{ video.userInfo }}</span>
            <span class="video-info-views">Views: {{ video.viewCount }}</span>
            <span v-if="video.cratedAt" class="video-info-uploaded-at">Uploaded: {{ video.cratedAt | dateParser }} </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userVideos" class="videos-container">
      <div v-for="video in userVideos" :key="video.id" class="video-item">
        <div class="video-item-thumbnail">
          <img :src="video.thumbnailUrl">
          <span class="video-info-duration">{{ video.videoData.duration | convertTime }} min</span>
          <div v-on:click="openVideo(video)" class="video-item-thumbnail-play">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </div>
        </div>
        <div class="video-info">
          <div>
            <h4 class="video-item-name" v-on:click="openVideo(video)">{{ video.videoData.filename | removeExtensions }}</h4>
          </div>
          <div class="video-item-info-row">
            <span class="video-info-uploader"><i class="fa fa-user-o" aria-hidden="true"></i> {{ video.userInfo }}</span>
            <span class="video-info-views">Views: {{ video.view_count }}</span>
            <span v-if="video.cratedAt" class="video-info-uploaded-at">Uploaded: {{ video.cratedAt | dateParser }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { VideoModel } from '../models/VideoModel';
  import Hls from 'hls.js';
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
        res.body.data.forEach((video) => {
          this.videos.push(new VideoModel(video));
        });
      })
    },
    methods: {
      openVideo(video) {
        let videoId = video.id;
        this.$router.push(`/videos/${videoId}`);
      },
      goToUser(video) {
        let userId = video.user_id;
        this.$router.push({path: `user/${video.userInfo}`, params: {test: userId}})
      }
    }


  }

</script>

