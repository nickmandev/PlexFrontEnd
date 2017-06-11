<template>
  <div>
    <h1 v-if="data.video" class="video-title">{{ videoData.filename | removeExtensions }}</h1>
    <div class="video-section">
      <video id="video" width=600 height=300 controls class="video-js vjs-default-skin">
      </video>
      <div class="video-section-info" v-if="ready">
        <div class="first-row">
          <p> {{ JSON.parse(data.video.user_info) }} </p>
          <p> Views: {{ data.video.view_count }} </p>
        </div>
        <div class="second-row">
          <p> Uploaded {{ data.video.created_at | dateParser }} </p>
        </div>
      </div>
    </div>
    <div class="comments-section">
      <form v-on:submit.prevent class="create-comment-form">
        <div class="create-comment-textarea-panel">
          <textarea class="create-comment-textarea" v-model="body"></textarea>
        </div>
        <div class="create-comment-error-panel">
          <p v-if="error">{{ error }}</p>
        </div>
        <div class="create-comment-buttons-panel">
          <button class="btn-main" v-on:click="resetForm">Cancel</button>
          <button class="btn-main" v-on:click="postComment">Submit</button>
        </div>
      </form>
      <div v-if="comments" class="comments-section">
        <div class="comment" v-for="item in comments">
          <p>{{ item.comment.user_info }} {{ item.comment.created_at | dateParser }} </p>
          <p>{{ item.comment.body }}</p>
          <p v-on:click="toogleResponseForm()">Add comment</p>
          <div class="comment-responses" v-if="item.messages.length > 0">
            <div v-for="message in item.messages">
              <p> {{ message.user_info }} {{ message.created_at | dateParser }} </p>
              <p> {{ message.body }} </p>
            </div>
          </div>
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
        ready: false
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
          this.ready = true;
          this.fetchComments();
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
        },
          () => {
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
        this.$http.post('comments_response', { comments_response: { 'body': this.responseBody, 'comment_id': comment.id } }).then((response) => {
          console.log(response);
        })
      },
      fetchComments() {
        console.log(this.data['video'].id);
        this.$http.get(`comments/${this.data['video'].id}`, { comment: { 'video_id': this.data['video'].id } }).then((response) => {
          this.comments = response.body.comments;
          console.log(this.comments);
        })
      },
      toogleResponseForm() {
        this.showResponseForm = !this.showResponseForm;
      },
      resetForm() {

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

  .video-title {
    color: #fff;
    text-align: center;
  }

  .video-section {
    background-color: #334d5c;
    margin-bottom: 20px;
    padding: 30px;
    box-sizing: border-box;
  }

  .create-comment-form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .video-section-info {
    width: 600px;
    padding: 10px;
    box-sizing: border-box;
    margin: auto;
    background-color: $main-color;
    color: #fff;
  }

  .video-section-info .first-row,
  .second-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .create-comment-textarea {
    width: 400px;
    height: 100px;
    resize: vertical;
  }
</style>
