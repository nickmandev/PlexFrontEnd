<template>
  <div class="profile-avatar">
    <form enctype="multipart/form-data">
      <div class="profile-avatar-box">
        <p class="profile-avatar-info">{{message}}</p>
        <label for="fileInput" class="btn-main profile-avatar-upload-btn">
          Upload
          <input id="fileInput" class="hidden" v-on:change="previewItem($event)" :accept="filter" type="file">
        </label>
        <div class="hidden profile-avatar-preview">
          <i v-on:click="removeItem()" class="fa fa-window-close profile-avatar-preview-close" aria-hidden="true"></i>
          <img id="preview" class="profile-avatar-preview-img">
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { store } from '../../store/index.ts'
export default {
  name: 'Upload',
  props: {
    message: {
      type: String
    },
    filter: {
      type: String
    },
    url: {
      type: String
    }
  },
  data() {
    return {
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
    uploadFile: (formData) => {
      let url = this.$http.options.root;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.$http.options.root}/${url}`);
      xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`);
      xhr.send(formData);
    },
    previewItem: (event) => {
      store.commit('uploadFile', event.target.files[0])
      this.previewEle.src = URL.createObjectURL(event.target.files[0]);
      this.previewContainer.classList.remove('hidden');
    },
    removeItem: (event) => {
      store.commit('uploadFile', '')
      this.previewEle.src = 'empty';
      this.previewContainer.classList.add('hidden');
      this.fileInput.value = '';
    }
  }
}

</script>
