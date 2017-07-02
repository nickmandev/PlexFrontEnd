import Vue from 'vue';
Vue.filter('convertTime', (value) => {
  value = (Math.floor(value) / 60).toFixed(2);
  return value
});
