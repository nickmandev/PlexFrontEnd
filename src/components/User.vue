<template>
  <div>
    <div class="user-info">
      <div class="user-card" :style="{'background': `url(${this.user.coverData})`}">
        <img :src="this.user.imageData" class="user-card-avatar"></img>
        <button class="btn-main user-change-cover-btn">Change cover</button>
      </div>
      <h1 class="user-info-username">{{ this.user.username }} </h1>
    </div>
    <videos v-bind:userVideos="videos"></videos>
  </div>
</template>

<script>
import { VideoModel } from '../models/VideoModel';
import { UserModel } from '../models/UserModel';
  export default {
    name: 'UserComponent',
    data() {
      return {
        params: {},
        videos: [],
        user: Object
      }
    },
    created() {
      this.params = this.$route.params
      this.$http.get(`collection/${this.params.name}`).then((res) => {
        res.body.data.forEach((video) => {
          this.videos.push(new VideoModel(video));
        });;
      });
    },
    beforeCreate() {
      this.$http.get('users/').then((response) => {
        this.user = new UserModel(response.body.user);
      });
    }
  }

</script>

<style>
@import '../assets/styles/variables.scss';
</style>
