<template>
  <div>
      <div class="user-current-password">
        <label for="oldPassword">Old Password</label>
        <input id="oldPassword" v-model="currentPassword" class="user-password-field" type="password">
      </div>
      <div class="user-new-password" v-bind:class="{'error': error}">
        <div v-interactiveLabels>
          <label for="newPassword">New Password</label>
          <input id="newPassword" v-model="newPassword" class="user-password-field" type="password">
        </div>
        <label for="repeatPassword">Repeat Password</label>
        <input id="repeatPassword" v-on:focusout="checkPassword" v-model="repeatPassword" class="user-password-field" type="password">
      </div>
      <div class="user-avatar">
        <form  enctype="multipart/form-data">
          <input id="fileInput" v-on:change="previewAvatar($event)" accept="image/*" type="file">
          <div class="hidden user-avatar-preview">
            <i v-on:click="previewAvatar()" class="fa fa-window-close user-avatar-preview-close" aria-hidden="true"></i>
            <img id="preview" class="user-avatar-preview-img">
          </div>
          <button v-on:click="uploadAvatar($event)">Upload</button>
        </form>
      </div>
  </div>
</template>

<script>
import { User } from '../models/UserModel'
export default {
  name: 'ProfileComponent',
  data(){
    return {
      username: '',
      previewEle: HTMLElement,
      previewContaier: HTMLElement,
      fileInput: HTMLElement,
      user: Object,
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
      error: false
    }
  },
  beforeCreate(){
    this.$http.get(`users/`).then((response) => {
      this.user = new User(response.body.user);
    })
  },
  mounted(){
    this.previewEle = document.getElementById('preview');
    this.previewContaier = this.previewEle.parentElement;
    this.fileInput = document.getElementById('fileInput');
  },
  methods: {
    checkPassword(){
      console.log('compare');
      if (this.newPassword && this.newPassword !== this.repeatPassword) {
        console.log('error');
        this.error = true
      } else {
        this.error = false
      }
    },
    previewAvatar(event) {
      if (!event) {
        this.previewEle.src = 'empty';
        this.previewContaier.classList.add('hidden');
        this.fileInput.value = '';
      } else {
        this.previewEle.src = URL.createObjectURL(event.target.files[0]);
        this.previewContaier.classList.remove('hidden');
      }
    },
    uploadAvatar(event){
      let formData = new FormData();
      formData.append('image', event.target.files[0]);
      let url = this.$http.options.root;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.$http.options.root}/users-avatar`);
      xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`);
      xhr.send(formData);
    }
  }
}
</script>

<style>

</style>

