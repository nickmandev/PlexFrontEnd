<template>
  <div>
      <div class="user-name">
        <input v-bind="username" class="user-name-input" type="text">
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
export default {
  name: 'ProfileComponent',
  data(){
    return {
      username: '',
      previewEle: HTMLElement,
      previewContaier: HTMLElement,
      fileInput: HTMLElement
    }
  },
  beforeCreate(){
    this.$http.get(`users/`).then((response) => {
      console.log(response);
    })
  },
  mounted(){
    this.previewEle = document.getElementById('preview');
    this.previewContaier = this.previewEle.parentElement;
    this.fileInput = document.getElementById('fileInput');
  },
  methods: {
    previewAvatar(event) {
      if (!event) {
        this.previewEle.src = 'empty';
        this.previewContaier.classList.add('hidden');
        this.fileInput.value = '';
        console.log(this.previewEle.src);
      } else {
        console.log('set SRC', event.target.files[0]);
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

