<template>
  <v-card class="profile-wrapper">
    <div class="profile-title">
      <h4 class="profile-title-element">Here you can change your profile information.</h4>
    </div>
    <div class="interactive-labels" v-interactiveLabels>
      <label for="oldPassword">Old Password</label>
      <input id="oldPassword" v-model="currentPassword" type="password">
    </div>
    <div class="user-new-password">
      <div class="interactive-labels" v-interactiveLabels v-bind:class="{'error': error}">
        <label for="newPassword">New Password</label>
        <input id="newPassword" v-model="newPassword" type="password">
      </div>
      <div class="interactive-labels" v-interactiveLabels v-bind:class="{'error': error}">
        <label for="repeatPassword">Repeat Password</label>
        <input id="repeatPassword" v-on:focusout="checkPassword" v-model="repeatPassword" type="password">
      </div>
    </div>
    <upload
      message="Click on 'Upload', to change your avatar."
      filter="image/*"
      url="users-avatar"
      :upload="this.$store.getters.getUploadFile"
    >
    </upload>
    <button class="btn-main" v-on:click="uploadFile()">Update</button>
  </v-card>
</template>

<script>
import { UserModel } from '../models/UserModel';
export default {
  name: 'ProfileComponent',
  data() {
    return {
      username: '',
      previewEle: HTMLElement,
      previewContaier: HTMLElement,
      fileInput: HTMLElement,
      user: Object,
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
      error: false,
    }
  },
  beforeCreate() {
    this.$http.get(`users/`).then((response) => {
      this.user = new UserModel(response.body.user);
    })
  },
  mounted() {
  },
  methods: {
    checkPassword: function () {
      if (this.newPassword && this.newPassword !== this.repeatPassword) {
        this.error = true
      } else {
        this.error = false
      }
    },
    uploadFile: function () {
      this.$store.commit('setUploadFile', true);
    }
  }
}
</script>

<style>

</style>

