<template>
  <div>
    <h1 v-if="data.video">{{ videoData.filename | removeExtensions }}</h1>
    <video id="video" width=600 height=300 controls class="video-js vjs-default-skin">
    </video>
  </div>
</template>

<script>
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  window.videojs = videojs;
  require('videojs-contrib-hls/dist/videojs-contrib-hls.js');
  require('videojs-resolution-switcher/lib/videojs-resolution-switcher.js');
  export default {
    name: 'Video',
    data() {
      return {
        data: {},
        videoData: {},
        name: '',
        url480p: '',
        url720p: '',
        player: '',
      }
    },
    beforeCreate() {
      let id = localStorage.getItem('videoId');
      let token = localStorage.getItem('token');
      this.$http.get(`videos/${id}`).then((response) => {
        this.data['video'] = response.data.video;
        this.url480p = `${this.data['video'].url}480/index.m3u8`
        this.url720p = `${this.data['video'].url}720/index.m3u8`
        this.videoData = JSON.parse(this.data.video.video_data);
        this.$nextTick(() => {
          this.setPlayer();
        });
      });
    },
    beforeDestroy() {
      this.player.dispose();
      localStorage.removeItem('videoId');
    },
    methods: {
      setPlayer() {
        this.player = videojs('video', {
          controls: true,
          plugins: {
            videoJsResolutionSwitcher: {
              default: 'low',
              dynamicLabel: true
            }
          }
        }, () => {
          this.player.updateSrc([
            { type: "application/x-mpegURL", src: `${this.url480p}`, label: '480p', res: 480 },
            { type: "application/x-mpegURL", src: `${this.url720p}`, label: '720p', res: 720 },
          ])
        })
      }
    },
  }

</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  .vjs-resolution-button-label {
    padding: 10px;
    display: block;
  }
</style>
