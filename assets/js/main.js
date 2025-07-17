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

  // --- Contribution Bubbles for Community Partners ---
  const initContributionBubbles = () => {
    const section = document.querySelector('.community-partners-section');
    const bubbleContainer = document.querySelector('.bubbles-container');
    if (!section || !bubbleContainer) return;

    const partnersWithContributions = Array.from(section.querySelectorAll('.partner-logo-link[data-contributions]'));
    if (partnersWithContributions.length === 0) return;

    const MAX_BUBBLES = 3;
    const BUBBLE_LIFETIME = 4000;
    const BUBBLE_INTERVAL = 2000;

    let bubblePool = [];
    for (let i = 0; i < MAX_BUBBLES; i++) {
      let bubble = document.createElement('div');
      bubble.className = 'contribution-bubble';
      bubble.dataset.busy = 'false';
      bubbleContainer.appendChild(bubble);
      bubblePool.push(bubble);
    }

    let activeBubbles = new Map();

    const updateBubblePositions = () => {
      activeBubbles.forEach((bubble, partner) => {
        const partnerRect = partner.getBoundingClientRect();
        const containerRect = bubbleContainer.getBoundingClientRect();

        const left = partnerRect.left - containerRect.left + (partnerRect.width / 2) - (bubble.offsetWidth / 2);
        const top = partnerRect.top - containerRect.top - bubble.offsetHeight - 10;

        bubble.style.transform = `translate(${left}px, ${top}px)`;
      });
      requestAnimationFrame(updateBubblePositions);
    };

    requestAnimationFrame(updateBubblePositions);

    const showBubble = (partner) => {
      const bubble = bubblePool.find(b => b.dataset.busy === 'false');
      if (!bubble) return;

      bubble.dataset.busy = 'true';
      activeBubbles.set(partner, bubble);

      bubble.innerHTML = partner.dataset.contributions;
      bubble.classList.add('visible');

      setTimeout(() => {
        hideBubble(partner, bubble);
      }, BUBBLE_LIFETIME);
    };

    const hideBubble = (partner, bubble) => {
      bubble.classList.remove('visible');
      activeBubbles.delete(partner);

      setTimeout(() => {
        bubble.dataset.busy = 'false';
      }, 300);
    };

    setInterval(() => {
      if (activeBubbles.size >= MAX_BUBBLES) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isInView) {
        const availablePartners = partnersWithContributions.filter(p => {
          if (activeBubbles.has(p)) return false;
          const r = p.getBoundingClientRect();
          return r.left > 50 && r.right < window.innerWidth - 50;
        });

        if (availablePartners.length > 0) {
          const randomIndex = Math.floor(Math.random() * availablePartners.length);
          showBubble(availablePartners[randomIndex]);
        }
      }
    }, BUBBLE_INTERVAL);
  };

  // --- Copy Code Block ---
  const initCopyCodeButtons = () => {
    const codeBlocks = document.querySelectorAll('.code-block-wrapper');
    codeBlocks.forEach(wrapper => {
      const codeElement = wrapper.querySelector('pre > code');
      const button = wrapper.querySelector('.copy-code-button');

      if (codeElement && button) {
        button.addEventListener('click', () => {
          const textToCopy = codeElement.innerText;
          navigator.clipboard.writeText(textToCopy).then(() => {
            button.classList.add('copied');
            button.querySelector('.copy-text').classList.add('hidden');
            button.querySelector('.copied-text').classList.remove('hidden');

            setTimeout(() => {
              button.classList.remove('copied');
              button.querySelector('.copy-text').classList.remove('hidden');
              button.querySelector('.copied-text').add('hidden');
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy code to clipboard.');
          });
        });
      }
    });
  };

  // --- OG Image Assets Modal ---
  const initOgImageModal = () => {
    const modal = document.getElementById('og-image-modal');
    const modalContent = document.getElementById('og-modal-content');
    const closeBtn = document.getElementById('og-modal-close');
    if (!modal || !modalContent || !closeBtn) return;

    const showModal = () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    };

    const hideModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    };

    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        hideModal();
      }
    });

    window.openOgModal = (imageUrls) => {
      modalContent.innerHTML = ''; // Clear previous content

      if (!imageUrls || imageUrls.length === 0) {
        modalContent.innerHTML = '<p class="text-center col-span-full">No social media assets found for this page.</p>';
      } else {
        imageUrls.forEach(img => {
          const cardHTML = `
            <div class="og-image-card text-center">
                <h4 class="font-semibold mb-2 text-sm">${img.label}</h4>
                <a href="${img.url}" download="${img.filename}" title="Download this image">
                    <img src="${img.url}" alt="OG Image Preview for ${img.label}" class="w-full rounded-md border border-border dark:border-darkmode-border shadow-md hover:shadow-lg transition-shadow">
                </a>
                <div class="mt-3">
                    <button class="copy-og-image-btn btn btn-sm btn-outline-primary" data-url="${img.url}">
                        <span class="copy-text">Copy Image</span>
                        <span class="copied-text hidden">Copied!</span>
                    </button>
                </div>
            </div>
          `;
          modalContent.insertAdjacentHTML('beforeend', cardHTML);
        });
      }

      modalContent.querySelectorAll('.copy-og-image-btn').forEach(button => {
        button.addEventListener('click', () => {
          const urlToCopy = button.dataset.url;
          fetch(urlToCopy)
            .then(response => response.blob())
            .then(blob => {
              const item = new ClipboardItem({ [blob.type]: blob });
              return navigator.clipboard.write([item]);
            })
            .then(() => {
              button.classList.add('copied');
              button.querySelector('.copy-text').classList.add('hidden');
              button.querySelector('.copied-text').classList.remove('hidden');
              setTimeout(() => {
                button.classList.remove('copied');
                button.querySelector('.copy-text').classList.remove('hidden');
                button.querySelector('.copied-text').classList.add('hidden');
              }, 2000);
            })
            .catch(err => {
              console.error('Failed to copy image: ', err);
              alert('Failed to copy image to clipboard. This feature requires a secure connection (HTTPS) and may need browser permissions.');
            });
        });
      });

      showModal();
    };

    document.querySelectorAll('[data-og-assets]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const assetsJson = trigger.dataset.ogAssets;
        try {
          const assets = JSON.parse(assetsJson);
          window.openOgModal(assets);
        } catch (error) {
          console.error("Could not parse OG assets JSON:", error);
          window.openOgModal([]);
        }
      });
    });
  };

  // Wait for the DOM to be fully loaded to initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCopyCodeButtons();
      initOgImageModal();
      if (window.innerWidth > 768) { // Only run on larger screens
        initContributionBubbles();
      }
    });
  } else {
    initCopyCodeButtons();
    initOgImageModal();
    if (window.innerWidth > 768) { // Only run on larger screens
      initContributionBubbles();
    }
  }

})();
