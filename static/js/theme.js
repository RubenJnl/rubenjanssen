import * as LS from './localstorage.js';

const theme = () => {
  getUserSetting();
  getSetting();
  bind();
}

const getUserSetting = () => {
  if (LS.getLocalStorage('theme') === 'dark'){
    let bodyEl = document.getElementsByTagName('html');
    bodyEl[0].classList.add('dark');
    let switchEl = document.getElementById('theme');
    switchEl.checked = true;
  }
}

const bind = () => {
  let switchEl = document.getElementById('theme');
  switchEl.addEventListener('change', (e) => {
    let bodyEl = document.getElementsByTagName('html');
    bodyEl[0].classList.toggle('dark');
    if (switchEl.checked){
      LS.setLocalStorage('theme', 'dark');
    } else {
      LS.removeLocalStorage('theme');
    }
  });
}

const getSetting = () => {
  let theme = LS.getLocalStorage('theme');
}

export default theme;
