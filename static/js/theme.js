import * as LS from './localstorage.js';

const theme = () => {
  getUserSetting();
  getSetting();
  bind();
}

const getUserSetting = () => {
  if (LS.getLocalStorage('theme') === 'light'){
    let bodyEl = document.getElementsByTagName('html');
    bodyEl[0].classList.add('light');
    let switchEl = document.getElementById('theme');
    switchEl.checked = true;
  }
}

const bind = () => {
  let switchEl = document.getElementById('theme');
  switchEl.addEventListener('change', (e) => {
    let bodyEl = document.getElementsByTagName('html');
    bodyEl[0].classList.toggle('light');
    if (switchEl.checked){
      LS.setLocalStorage('theme', 'light');
    } else {
      LS.removeLocalStorage('theme');
    }
  });
}

const getSetting = () => {
  let theme = LS.getLocalStorage('theme');
}

export default theme;
