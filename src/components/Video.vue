<template>
  <div>
    <h1 v-if="ready" class="video-title">{{ video.videoData.filename | removeExtensions }}</h1>
    <div class="video-section">
      <video id="video" width=600 height=300 controls class="video-js vjs-default-skin">
      </video>
      <div class="video-section-info" v-if="ready">
        <div class="first-row">
          <p v-on:click="goToUser(video.userInfo)"> {{ video.userInfo }} </p>
          <p> Views: {{ video.viewCount }} </p>
        </div>
        <div class="second-row">
          <p> Uploaded {{ video.createdAt | dateParser }} </p>
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
        <div v-if="body.length > 0" class="create-comment-buttons-panel">
          <button class="btn-main comments-cancel-btn" v-on:click="resetCommentForm">Cancel</button>
          <button class="btn-main comments-send-btn" v-on:click="postComment">Submit</button>
        </div>
      </form>
      <div class="comments-section">
        <div class="comment" v-for="comment in this.comments" :key="comment.id">
          <div class="comment-first-row">
            <p >{{ comment.userInfo }} </p>
            <p> {{ comment.createdAt | dateParser }} </p>
          </div>
          <div class="comment-second-row">
            <p>{{ comment.body }}</p>
          </div>
          <button v-if="!responseForm" :id="'button-' + comment.id" class="btn-main comment-response-button" v-on:click="toogleResponseForm(comment.id)">Add comment</button>
          <div class="comments-response-form hidden" :id="comment.id">
            <form v-on:submit.prevent>
              <textarea class="comments-response-form-textarea" v-model="responseBody"></textarea>
              <div class="comments-response-form-button-panel">
                <p v-if="error">{{ error }}</p>
                <div v-if="responseBody.length > 0">
                  <button class="btn-main comments-cancel-btn" v-on:click="resetForm(comment.id)">Cancel</button>
                  <button class="btn-main comments-send-btn" v-on:click="postCommentResponse(comment)">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div class="comment-responses" v-if="comment.messages">
            <div class="comment" v-for="message in comment.messages" :key="message.id">
              <div class="comment-first-row">
                <p> {{ message.userInfo }} </p>
                <p> {{ message.createdAt | dateParser }} </p>
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
  import { VideoModel } from '../models/VideoModel.ts';
  import { Comment } from '../models/CommentModel.ts';
  import { Response } from '../models/ResponseModel.ts';
  window.videojs = videojs;
  require('videojs-contrib-hls/dist/videojs-contrib-hls.js');
  require('videojs-resolution-switcher/lib/videojs-resolution-switcher.js');
  export default {
    name: 'Video',
    data() {
      return {
        video: Object,
        comments: [],
        name: '',
        player: '',
        body: '',
        responseBody: '',
        error: '',
        responseForm: false,
        ready: false,
        commentForm: '',
        responseFormFlag: false
      }
    },
    beforeCreate() {
      let id = this.$route.params.id;
      let token = localStorage.getItem('token');
      this.$http.get(`videos/${id}`).then((response) => {
        this.video = new VideoModel(response.data.video);
        this.$nextTick(() => {
          this.setPlayer();
          this.ready = true;
          this.fetchComments();
          this.commentForm = document.getElementById('createCommentForm');
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
              { type: "application/x-mpegURL", src: `${this.video.url480}`, label: '480p', res: 480 },
              { type: "application/x-mpegURL", src: `${this.video.url720}`, label: '720p', res: 720 },
            ])
          })
      },
      postComment() {
        this.$http.post('comments', { comment: { 'body': this.body, 'video_id': this.video.id } }).then((response) => {
          if (response.body.comment) {
            let comment = response.body;
            this.comments.push(comment);
            this.body = '';
          }

          if (response.body.error) {
            this.error = response.body.error
          }
        })
      },
      postCommentResponse(comment) {
        this.$http.post('comments_response', { comments_response: { 'body': this.responseBody, 'comment_id': comment.id } }).then((response) => {
          this.comments.forEach(ele => {
            if (ele.id === comment.id) {
              ele.messages.push(new Response(response.body.response));
            }
          })
          this.responseBody = '';
        })
      },
      goToUser(name){
        this.$router.push(`/user/${name}`)
      },
      fetchComments() {
        this.$http.get(`comments/${this.video.id}`, { comment: { 'video_id': this.video.id } }).then((response) => {
          response.body.comments.forEach((comment) => {
            this.comments.push(new Comment(comment));
          });
        })
      },
      toogleResponseForm(id) {
        let formContainer = document.getElementById(id);
        let formShowButton = document.getElementById(`button-${id}`)
        if (!this.responseFormFlag) {
          formContainer.classList.remove('hidden');
          formShowButton.classList.add('hidden');
        }
        this.responseFormFlag = true;
      },
      resetForm(id) {
        let formContainer = document.getElementById(id);
        formContainer.classList.add('hidden');
        let formShowButton = document.getElementById(`button-${id}`)
        formShowButton.classList.remove('hidden');
        this.responseBody = '';
        this.responseForm = false;
        this.responseFormFlag = false;
      },
      resetCommentForm() {
        this.body = '';
      }
    },
    watch: {
      hideShowButtons: () => {

      }
    }
  }

</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';


</style>
