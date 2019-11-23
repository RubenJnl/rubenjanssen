import * as LS from './localstorage.js';

const theme = () => {
  replaceCurrent();
  bind();
}

const replaceCurrent = () => {
  if (LS.getLocalStorage('theme') === 'light' || LS.getLocalStorage('theme') === 'dark'){
    LS.removeLocalStorage('theme');
  }
  getUserSetting();
}

const getUserSetting = () => {
  if (LS.getLocalStorage('theme') === 'swap'){
    let bodyEl = document.getElementsByTagName('html');
    bodyEl[0].classList.add('swap');
    let switchEl = document.getElementById('theme');
    switchEl.checked = true;
  }
}

const bind = () => {
  let switchEl = document.getElementById('theme');
  switchEl.addEventListener('change', (e) => {
    let bodyEl = document.getElementsByTagName('html');
    bodyEl[0].classList.toggle('swap');
    if (switchEl.checked){
      LS.setLocalStorage('theme', 'swap');
    } else {
      LS.removeLocalStorage('theme');
    }
  });
}

const getSetting = () => {
  let theme = LS.getLocalStorage('theme');
}

export default theme;
