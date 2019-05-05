
export function getLocalStorage(name){
  if (test) {
    return localStorage.getItem(name);
  }
}

export function setLocalStorage(name, value){
  if (test) {
    localStorage.setItem(name, value);
  }
}

export function removeLocalStorage(name) {
  if (test){
    localStorage.removeItem(name);
  }
}

const test = () => {
  try {
   localStorage.setItem("test", "Hello World!");
  } catch (e) {
    if (e == QUOTA_EXCEEDED_ERR) {
       return false
     } else {
       return true
     }
  }

}
