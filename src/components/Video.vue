<template>
  <div>
    <h1>{{ name }}</h1>
    <video v-if="video" id="video" width=600 height=300 controls class="video-js vjs-default-skin">
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
        video: Object,
        videoData: Object,
        name: '',
        url480p: '',
        url720p: '',
        player: '',
      }
    },
    created() {
      this.video = JSON.parse(localStorage.getItem('video'));
      this.url480p = `${this.video.url}480/index.m3u8`
      this.url720p = `${this.video.url}720/index.m3u8`
      this.videoData = JSON.parse(this.video.video_data);
      this.filterExtensions(this.videoData)
      this.$nextTick(() => {
        this.setPlayer();
      });

    },
    beforeDestroy() {
      this.player.dispose();
      localStorage.removeItem('video');
    },
    methods: {
      setPlayer() {
        let url480p = this.url480p;
        let url720p = this.url720p;
        this.player = videojs('video')
        this.player.videoJsResolutionSwitcher()
        this.videoSet = true;
        this.player.updateSrc([
          { type: "application/x-mpegURL", src: `${this.url480p}`, label: '480p' },
          { type: "application/x-mpegURL", src: `${this.url720p}`, label: '720p' },
        ])

      },
      filterExtensions(value) {
        let localName = value.metadata.filename
        let extensions = ['mov', 'avi', 'mkv', 'mp4', '3gp', 'wmv', 'flv', 'vob', 'ogv']
        extensions.forEach(function (ele) {
          if (localName.indexOf(`.${ele}`) > -1) {
            localName = localName.replace(`.${ele}`, '');
          }
        });
        this.name = localName;
      }
    },
  }

</script>

<style>
  .vjs-resolution-button-label {
    display: block;
    padding: 10px;
  }
</style>
