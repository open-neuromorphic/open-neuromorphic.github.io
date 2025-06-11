// main script
(function () {
  "use strict";

  // --- Mobile Nav Toggle ---
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
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('is-mobile-nav-open')) {
      toggleNav();
    }
  });

  // --- Desktop Dropdown Menu ---
  const dropdownMenuTogglers = document.querySelectorAll(
    ".nav-dropdown > span", // Target the span inside the dropdown li
  );

  dropdownMenuTogglers.forEach((toggler) => {
    // For large screens, we can use hover or click.
    // Let's stick with the parent's group-hover from Tailwind for pure CSS-driven hover effect.
    // If a click is desired on desktop, this is where you'd add it.
    // For now, no JS is needed for desktop dropdowns due to `group-hover` in the HTML.
  });

})();
