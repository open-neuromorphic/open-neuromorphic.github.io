// main script
(function () {
  "use strict";

  // Dropdown Menu Toggler For Mobile
  // ----------------------------------------
  const dropdownMenuToggler = document.querySelectorAll(
    ".nav-dropdown > .nav-link",
  );

  dropdownMenuToggler.forEach((toggler) => {
    toggler?.addEventListener("click", (e) => {
      e.target.parentElement.classList.toggle("active");
    });
  });

  window.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
          document.querySelector(`.toc nav li a[href="#${id}"]`).parentElement.classList.add('active');
        } else {
          document.querySelector(`.toc nav li a[href="#${id}"]`).parentElement.classList.remove('active');
        }
      });
    });
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });
  });
})();
