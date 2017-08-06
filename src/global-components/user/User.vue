<template>
  <div>
    <div class="user-info">
      <div class="user-card" :style="{'background': `url(${this.coverUrl})`}">
        <img :src="avatarUrl" class="user-card-avatar"></img>
        <upload :showProgress="false" filter="image/*" url="users" :preview="false" :upload="this.$store.getters.getUploadFile" params='image_data'>
          <label slot="upload-button" for="fileInput" class="btn-main upload-file-upload-btn">
            Change cover
          </label>
        </upload>
      </div>
      <h1 class="user-info-username">{{ this.user.username }} </h1>
    </div>
    <videos v-bind:userVideos="videos"></videos>
  </div>
</template>

<script>
import { VideoModel } from '@/models/VideoModel';
import { UserModel } from '@/models/UserModel';
import config from '@/config/config';
export default {
  name: 'UserComponent',
  props: {
    passedUsername: {
      type: String
    }
  },
  data() {
    return {
      params: {},
      videos: [],
      user: Object,
      avatarUrl: '',
      coverUrl: '',
      username: String
    }
  },
  created() {
    // Check if user get here by Profile or by clicking on User's name
    if (this.passedUsername) {
      this.username = this.passedUsername
    } else {
      this.username = this.$route.params.name
    }
    this.$http.get(`collection/${this.username}`).then((res) => {
      res.body.videos.forEach((video) => {
        this.videos.push(new VideoModel(video));
      });
      this.user = new UserModel(res.body.user);
      this.checkImageOrCoverData();
    });
  },
  methods: {
    // Check if there's cover or avatar.
    checkImageOrCoverData: function (type) {
      if (Object.keys(this.user.imageData).length) {
        this.avatarUrl = `${config.root}/uploads/avatars/${this.user.imageData.id}`
      } else {
        this.avatarUrl = `${config.root}/uploads/avatars/default-avatar.jpg`
      }
      if (Object.keys(this.user.coverData).length) {
        this.coverUrl = `${config.root}/uploads/covers/${this.user.coverData.id}`
      } else {
        this.coverUrl = `${config.root}/uploads/covers/default-cover.svg`
      }
    }
  }
}

</script>
