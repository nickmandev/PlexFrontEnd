import Vue from 'vue';

Vue.filter('removeExtensions', (value) => {
  let extensions = ['mov', 'avi', 'mkv', 'mp4', '3gp', 'wmv', 'flv', 'vob', 'ogv']
  extensions.forEach(function (ele) {
    if (value.indexOf(`.${ele}`) > -1) {
      value = value.replace(`.${ele}`, '');
    }
  });

  return value;
});
