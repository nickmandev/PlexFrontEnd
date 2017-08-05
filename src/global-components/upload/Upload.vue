<template>
  <div class="upload-file">
    <form enctype="multipart/form-data" v-if="!inProgress">
      <div class="upload-file-box">
        <p class="upload-file-info">{{message}}</p>
        <label for="fileInput" class="btn-main upload-file-upload-btn">
          Select file
          <input id="fileInput" class="hidden" v-on:change="previewItem($event)" :accept="filter" type="file">
        </label>
        <div class="hidden upload-file-preview">
          <i v-on:click="removeItem()" class="fa fa-window-close upload-file-preview-close" aria-hidden="true"></i>
          <img v-if="filter.includes('image')" id="preview" class="upload-file-preview-img">
          <p v-else id="preview" class="upload-file-preview-file"></p>
        </div>
      </div>
    </form>
    <div class="hidden upload-progress" id="progress-container">
      <div class="upload-progress-bar-container">
        <span id="progress-bar" class="upload-progress-bar"></span>
      </div>
      <span id="progress-percents" class="upload-progress-percents"></span>
    </div>
  </div>
</template>
<script>
import { store } from '../../store/index'
import config from '../../config/config'
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
    },
    upload: {
      type: Boolean,
      default: false
    },
    params: {
      type: String
    }
  },
  data() {
    return {
      previewEle: HTMLElement,
      previewContainer: HTMLElement,
      progressContainer: HTMLElement,
      progressBar: HTMLElement,
      progressPercents: HTMLElement,
      formData: FormData,
      file: Object,
      progress: 0,
      inProgress: false,
      xhr: XMLHttpRequest
    }
  },
  mounted: function () {
    this.previewEle = document.getElementById('preview');
    this.previewContainer = this.previewEle.parentElement;
    this.fileInput = document.getElementById('fileInput');
    this.progressContainer = document.getElementById('progress-container');
    this.progressBar = document.getElementById('progress-bar');
    this.progressPercents = document.getElementById('progress-percents');
    this.formData = new FormData();
    this.xhr = new XMLHttpRequest();
  },
  watch: {
    upload: function () {
      if (this.upload === true) {
        this.uploadFile();
      }
    }
  },
  methods: {
    uploadFile: function () {
      this.xhr.upload.addEventListener('progress', this.handleProgress, false);
      this.xhr.open('POST', `${config.root}/${this.url}`);
      this.xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`);
      this.xhr.send(this.formData);
    },
    previewItem: function (event) {
      this.file = event.target.files[0];
      if (this.filter.includes('image')) {
        this.previewEle.src = URL.createObjectURL(event.target.files[0]);
      } else {
        this.previewEle.innerHTML = this.file.name
      }
      this.previewContainer.classList.remove('hidden');
      this.formData.append(`${params}`, event.target.files[0]);
    },
    removeItem: function () {
      if (this.previewEle.src) {
        this.previewEle.src = 'empty';
      } else {
        this.previewEle.innerHTML = '';
      }
      this.previewContainer.classList.add('hidden');
      this.fileInput.value = '';
      this.formData = new FormData();
    },
    handleProgress: function (evt) {
      this.progressContainer.classList.remove('hidden');
      this.inProgress = true;
      if (evt.lengthComputable) {
        this.progress = ((evt.loaded / evt.total) * 100).toFixed(0);
        this.progressBar.style.width = `${this.progress}%`;
        this.progressPercents.innerHTML = `${this.progress}%`;
      }
      if (this.progress == '100') {
        this.xhr.upload.removeEventListener('progress', this.handleProgress, false);
        this.formData = new FormData();
        this.progressContainer.classList.add('hidden');
        store.commit('setUploadFile', false);
        this.removeItem()
        this.inProgress = false;
      }
    }
  }
}

</script>
