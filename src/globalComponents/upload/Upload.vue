<template>
  <div class="profile-avatar">
    <form enctype="multipart/form-data">
      <div class="profile-avatar-box">
        <p class="profile-avatar-info">{{message}}</p>
        <label v-if="previewElement" for="fileInput" class="btn-main profile-avatar-upload-btn">
          Upload
          <input id="fileInput" class="hidden" v-on:change="previewAvatar($event)" :accept="filter" type="file">
        </label>
        <label v-else for="fileInput" class="btn-main profile-avatar-upload-btn">
          Upload
          <input id="fileInput" class="hidden" :accept="filter" type="file">
        </label>
        <div class="hidden profile-avatar-preview">
          <i v-on:click="previewAvatar()" class="fa fa-window-close profile-avatar-preview-close" aria-hidden="true"></i>
          <img id="preview" class="profile-avatar-preview-img">
        </div>
      </div>
      <button v-if="previewElement" class="btn-main" v-on:click="uploadFile($event)">Update</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Upload',
  props: {
    message: {
      type: String
    },
    filter: {
      type: String
    },
    previewElement: {
      type: Boolean,
      default: false
    },
    url: {

    }
  },
  data() {
    return{
      previewEle: HTMLElement,
      previewContainer: HTMLElement
    }
  },
  mounted: () => {
    this.previewEle = document.getElementById('preview');
    this.previewContainer = this.previewEle.parentElement;
    this.fileInput = document.getElementById('fileInput');
  },
  methods: {
    uploadFile(event) {
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      let url = this.$http.options.root;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.$http.options.root}/${url}`);
      xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`);
      xhr.send(formData);
    },
    previewAvatar: (event) => {
      if (!event) {
        this.previewEle.src = 'empty';
        this.previewContainer.classList.add('hidden');
        this.fileInput.value = '';
      } else {
        this.previewEle.src = URL.createObjectURL(event.target.files[0]);
        this.previewContainer.classList.remove('hidden');
      }
      if (!previewElement) {
        this.uploadFile(event);
      }
    }
  }
}

</script>
