<template>
  <div id="register">
    <div v-if="message">{{this.message}}</div>
    <form v-on:submit.prevent="register" enctype="multipart/form-data">
      <div class="authenticate-form-container">
        <div class="authenticate-fields">
          <input name="name" placeholder="Username" v-model="user.name" type="text">
        </div>
        <div class="authenticate-fields">
          <input name="email" placeholder="Email" v-model="user.email" type="text">
        </div>
        <div class="authenticate-fields">
          <input name="password" placeholder="Password" v-model="user.password" type="password">
        </div>
        <div class="authenticate-fields">
          <input name="confirm_password" placeholder="Confirm Password" v-model="confirm_password" type="password">
        </div>
        <vue-clip :options="options" :on-added-file="addedFile" :on-init="uploaderInit" class="upload-box">
          <template slot="clip-uploader-action">
            <div>
              <div class="dz-message">
                <h2> Click or Drag and Drop files here upload </h2>
              </div>
            </div>
          </template>
          <template slot="clip-uploader-body" scope="props">
            <div v-for="file in props.files" class="preview-avatar-container">
              <img id="preview" v-bind:src="file.dataUrl" class="preview-avatar" />
              <i v-on:click="removePreview(file)" class="fa fa-times delete-preview" aria-hidden="true"></i>
            </div>
          </template>
        </vue-clip>
        <button class="btn-main">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import config from '../config/config';
  export default {
    name: 'RegisterComponent',
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
          avatar: ''
        },
        options: {
          url: 'test',
          maxFilesize: {
            limit: 1,
            message: '{{ filesize }} is greater than the {{ maxFilesize }}'
          },
          autoProcessQueue: false
        },
        confirm_password: '',
        message: '',
        uploaderObject: {}
      }
    },

    methods: {
      register() {
        if (this.confirm_password === this.user.password && this.testEmail()) {
          /*this.$http.post('users', { user: this.user }).then(function (response) {
            this.message = response.body.message
          }), (error) => {
            console.log(error);
          }*/
        } else {
          this.message = "Password and Confirm password must be identical."
        }
      },
      addedFile(file) {
        console.log(file);
      },
      removePreview(file) {
        this.uploaderObject.removeFile(file);
        document.getElementById('preview').setAttribute('src', '');
        console.log(this.uploaderObject)
      },
      testEmail(uploader) {
        if (config.emailRegEx.test(this.user.email)) {
          return true
        }
        this.message = 'Email is invalid'
        return false
      },
      uploaderInit(uploader) {
        this.uploaderObject = uploader;
        console.log(this.uploaderObject);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../assets/styles/variables.scss';
  .upload-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px dashed #45b29d;
    padding: 20px;
    box-sizing: border-box;
    width: 500px;
    margin-bottom: 20px;
  }

  .preview-avatar-container {
    position: relative;
  }

  .delete-preview {
    position: absolute;
    top: 0px;
    right: 3px;
    font-size: 20px;
    color: #000;
    background-color: #fff;
  }
  .preview-avatar {
    border: 4px solid #fff;
  }
  .dz-message {
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
