(function () {
  "use strict";

  const initNav = () => {
    const body = document.body;
    const navToggler = document.getElementById("nav-toggler");
    const navOverlay = document.getElementById("mobile-nav-overlay");
    const navCloseBtn = document.getElementById("mobile-nav-close");

    const toggleNav = () => {
      body.classList.toggle("is-mobile-nav-open");
    };

    if (navToggler) {
      navToggler.addEventListener("click", toggleNav);
    }
    if (navOverlay) {
      navOverlay.addEventListener("click", toggleNav);
    }
    if (navCloseBtn) {
      navCloseBtn.addEventListener("click", toggleNav);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('is-mobile-nav-open')) {
        toggleNav();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
