<template>
  <div>
    <h1 v-if="data.video">{{ videoData.filename | removeExtensions }}</h1>
    <video id="video" width=600 height=300 controls class="video-js vjs-default-skin">
    </video>
    <div class="video-comments-section">
      <form v-on:submit.prevent>
        <textarea v-model="body"></textarea>
        <p v-if="error">{{ error }}</p>
        <button v-on:click="postComment">Submit</button>
      </form>
      <div v-if="comments" class="comments">
        <div class="comment" v-for="comment in comments">
          <p>{{ comment.user_info }} {{ comment.created_at | dateParser }} </p>
          <p>{{ comment.body }}</p>
          <p v-on:click="toogleResponseForm()">Add comment</p>
          <div v-if="showResponseForm" class="comments-reponse-form">
            <form v-on:submit.prevent>
              <textarea v-model="responseBody"></textarea>
              <p v-if="error">{{ error }}</p>
              <button v-on:click="postCommentResponse(comment)">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
        comments: [],
        name: '',
        url480p: '',
        url720p: '',
        player: '',
        body: '',
        responseBody: '',
        error: '',
        showResponseForm: false,
      }
    },
    beforeCreate() {
      let id = localStorage.getItem('videoId');
      let token = localStorage.getItem('token');
      this.$http.get(`videos/${id}`).then((response) => {
        this.data['video'] = response.data.video;
        this.comments = response.data.comments;
        this.url480p = `${this.data['video'].url}480/index.m3u8`
        this.url720p = `${this.data['video'].url}720/index.m3u8`
        this.videoData = JSON.parse(this.data.video.video_data);
        this.$nextTick(() => {
          this.comments.forEach((comment) => {
            comment.user_info = JSON.parse(comment.user_info);
          });
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
      },
      postComment() {
        this.$http.post('comments', { comment: { 'body': this.body, 'video_id': this.data['video'].id } }).then((response) => {
          if (response.body.comment) {
            let comment = response.body.comment
            comment['user_info'] = JSON.parse(comment['user_info'])
            this.comments.push(comment)
          }

          if (response.body.error) {
            this.error = response.body.error
          }
        })
      },
      postCommentResponse(comment) {
        this.$http.post('comments_response', { comments_response: { 'body': this.responseBody, 'comment_id': comment.id} }).then((response) => {
          console.log(response);
        })
      },
      toogleResponseForm() {
        this.showResponseForm = !this.showResponseForm;
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

  .video-js {
    margin: auto;
  }
</style>
