(function () {
  "use strict";

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
      modalContent.innerHTML = '';
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
                    <a href="${img.url}" download="${img.filename}" class="btn btn-sm btn-new-primary">
                        Download
                    </a>
                </div>
            </div>
          `;
          modalContent.insertAdjacentHTML('beforeend', cardHTML);
        });
      }
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOgImageModal);
  } else {
    initOgImageModal();
  }
})();
