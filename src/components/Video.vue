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
      <form v-on:submit.prevent class="create-comment-form" id="createCommentForm">
        <div class="create-comment-textarea-panel">
          <textarea class="create-comment-textarea" v-model="body"></textarea>
        </div>
        <div class="create-comment-error-panel">
          <p v-if="error">{{ error }}</p>
        </div>
        <div class="create-comment-buttons-panel">
          <button class="btn-main comments-cancel-btn" v-on:click="resetCommentForm">Cancel</button>
          <button class="btn-main comments-send-btn" v-on:click="postComment">Submit</button>
        </div>
      </form>
      <div v-if="comments" class="comments-section">
        <div class="comment" v-for="item in comments">
          <div class="comment-first-row">
            <p>{{ JSON.parse(item.comment.user_info) }} </p>
            <p> {{ item.comment.created_at | dateParser }} </p>
          </div>
          <div class="comment-second-row">
            <p>{{ item.comment.body }}</p>
          </div>
          <button v-if="!responseForm" :id="'button-' + item.comment.id" class="btn-main comment-response-button" v-on:click="toogleResponseForm(item.comment.id)">Add comment</button>
          <div class="comments-response-form hidden" :id="item.comment.id">
            <form v-on:submit.prevent>
              <textarea class="comments-response-form-textarea" v-model="responseBody"></textarea>
              <div class="comments-response-form-button-panel">
                <p v-if="error">{{ error }}</p>
                <button class="btn-main comments-cancel-btn" v-on:click="resetForm(item.comment.id)">Cancel</button>
                <button class="btn-main comments-send-btn" v-on:click="postCommentResponse(item.comment)">Submit</button>
              </div>
            </form>
          </div>
          <div class="comment-responses" v-if="item.messages">
            <div class="comment" v-for="message in item.messages">
              <div class="comment-first-row">
                <p> {{ JSON.parse(message.user_info) }} </p>
                <p> {{ message.created_at | dateParser }} </p>
              </div>
              <div class="comment-second-row">
                <p> {{ message.body }} </p>
              </div>
            </div>
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
        responseForm: false,
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
            let comment = response.body
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
        this.$http.get(`comments/${this.data['video'].id}`, { comment: { 'video_id': this.data['video'].id } }).then((response) => {
          this.comments = response.body.comments;
        })
      },
      toogleResponseForm(id) {
        let formContainer = document.getElementById(id);
        let formShowButton = document.getElementById(`button-${id}`)
        formContainer.classList.remove('hidden');
        formShowButton.classList.add('hidden');
      },
      resetForm(id) {
        let formContainer = document.getElementById(id);
        formContainer.classList.add('hidden');
        let formShowButton = document.getElementById(`button-${id}`)
        formShowButton.classList.remove('hidden');
        let form = formContainer.querySelector('form');
        form.reset();
        this.responseForm = false;
      },
      resetCommentForm() {
        let createCommentForm = document.getElementById('createCommentForm');
        createCommentForm.reset();
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
    width: 600px;
    margin: auto;
    margin-bottom: 20px;
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
    width: 600px;
    height: 100px;
    resize: none;
    border: 2px solid #45b29d;
    box-sizing: border-box;
    font-size: 1rem;
    color: #334d5c;
    padding: 10px;
  }

  .create-comment-buttons-panel {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  .comment-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .comment {
    color: #fff;
    width: 600px;
    border: 1px solid #fff;
    padding: 10px;
    background-color: #45b29d;
    margin: auto;
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .comment-first-row {
    display: flex;
    justify-content: space-between;
  }

  .comment-second-row {
    display: flex;
    flex-direction: column;
  }

  .comment-response-button {
    max-width: 140px;
    margin-left: auto;
    display: flex;
    margin-bottom: 10px;
  }

  .comments-response-form {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  .comments-response-form-textarea {
    resize: none;
    width: 400px;
    height: 100px;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    color: #334d5c;
  }

  .comments-response-form-button-panel {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .comments-send-btn {
    margin-left: 10px !important;
    border: 1px solid #fff !important;
  }

  .comments-cancel-btn {
    border: 1px solid #fff !important;
    color: #ffffff !important;
    background-color: #E91E63 !important;
  }

  .comment-responses {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .comment-responses .comment {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 100px;
    background-color: #009688;
    color: #ffffff;
    margin: 0px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .comment-responses .comment .comment-first-row {
    display: flex;
    justify-content: space-between;
  }

  .comment-responses .comment .comment-second-row {
    display: flex;
    justify-content: flex-start;
  }
</style>
