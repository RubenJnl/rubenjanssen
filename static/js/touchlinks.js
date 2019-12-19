
const touchLinks = () => {
  // check if touch
  if ("ontouchstart" in document.documentElement) {
    // handle touch events for focus
    let links = document.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('touchstart', (e) => {
        e.target.focus()
      }, {passive:true});
    });
  }
};

export default touchLinks;
