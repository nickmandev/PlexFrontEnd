import Vue from 'vue';

Vue.directive('interactiveLabels', {
  bind: function (el) {
    let label = el.querySelector('label');
    let input = el.querySelector('input');
    input.addEventListener('click', handleClick, false);
    label.addEventListener('click', handleClick, false);
    input.addEventListener('focusout', focusOut, false);
    input.addEventListener('focusin', focusIn, false);

    function focusOut() {
      if (input.value === ''){
        label.classList.remove('active');
      }
    }
    function focusIn() {
      label.classList.add('active');
    }
    function handleClick() {
      label.classList.add('active')
    }
  }
})
