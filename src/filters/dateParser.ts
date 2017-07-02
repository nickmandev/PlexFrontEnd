import Vue from 'vue';
Vue.filter('dateParser', (value) => {
  let date = new Date(value.toString());
  let today = new Date();
  let response = '';
  let diff = 0;
  if (today > date) {
    if (today.getFullYear() > date.getFullYear()) {
      diff = today.getFullYear() - date.getFullYear();
      return response = `${diff} years ago`;
    }
    if (today.getMonth() > date.getMonth()) {
      diff = today.getMonth() - date.getMonth();
      return response = `${diff} months ago`;
    }
    if (today.getDate() > date.getDate()) {
      diff = today.getDate() - date.getDate();
      return response = `${diff} days ago`;
    }
    if (today.getDate() === date.getDate()) {
      if (today.getHours() > date.getHours()) {
        diff = today.getHours() - date.getHours();
        return response = `${diff} hours ago`;
      } else if (today.getMinutes() > date.getMinutes()) {
        diff = today.getMinutes() - date.getMinutes();
        return response = `${diff} minutes ago`;
      }
    }
  }
})
