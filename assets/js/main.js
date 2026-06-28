(function () {
  "use strict";

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
    let recentlyHidden = new Set();
    const COOLDOWN_PERIOD = BUBBLE_INTERVAL;

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

    const setBubbleContent = (partner) => {
      const name = partner.dataset.projectName || '';
      const description = partner.dataset.projectDescription || '';
      const contributions = partner.dataset.contributions;

      return `
        <div class="bubble-content">
          <h4 class="bubble-title">${name}</h4>
          <p class="bubble-description">${description}</p>
          ${contributions ? `<div class="bubble-separator"></div><div class="bubble-contributions">${contributions}</div>` : ''}
        </div>
      `;
    }

    const showBubble = (partner) => {
      const bubble = bubblePool.find(b => b.dataset.busy === 'false');
      if (!bubble) return;
      partner.classList.add('is-highlighted');
      bubble.dataset.busy = 'true';
      activeBubbles.set(partner, bubble);
      bubble.innerHTML = setBubbleContent(partner);
      bubble.classList.add('visible');
      setTimeout(() => hideBubble(partner, bubble), BUBBLE_LIFETIME);
    };

    const hideBubble = (partner, bubble) => {
      partner.classList.remove('is-highlighted');
      bubble.classList.remove('visible');
      activeBubbles.delete(partner);
      recentlyHidden.add(partner);
      setTimeout(() => { bubble.dataset.busy = 'false'; }, 400);
      setTimeout(() => { recentlyHidden.delete(partner); }, COOLDOWN_PERIOD);
    };

    let hoverBubble = document.createElement('div');
    hoverBubble.className = 'contribution-bubble';
    bubbleContainer.appendChild(hoverBubble);
    let isHovering = false;

    partnersWithContributions.forEach(partner => {
      partner.addEventListener('mouseenter', () => {
        isHovering = true;
        activeBubbles.forEach((bubble, p) => hideBubble(p, bubble));

        hoverBubble.innerHTML = setBubbleContent(partner);

        const partnerRect = partner.getBoundingClientRect();
        const containerRect = bubbleContainer.getBoundingClientRect();
        const left = partnerRect.left - containerRect.left + (partnerRect.width / 2) - (hoverBubble.offsetWidth / 2);
        const top = partnerRect.top - containerRect.top - hoverBubble.offsetHeight - 10;

        hoverBubble.style.transform = `translate(${left}px, ${top}px)`;
        hoverBubble.classList.add('visible');
      });

      partner.addEventListener('mouseleave', () => {
        isHovering = false;
        hoverBubble.classList.remove('visible');
      });
    });

    setInterval(() => {
      if (isHovering || activeBubbles.size >= MAX_BUBBLES) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isInView) {
        const availablePartners = partnersWithContributions.filter(p => {
          if (activeBubbles.has(p) || recentlyHidden.has(p)) return false;
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
              button.querySelector('.copied-text').classList.add('hidden');
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy code to clipboard.');
          });
        });
      }
    });
  };

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

  const initMissionBoardFilters = () => {
    const filterTags = document.querySelectorAll('.filter-tag');
    const clearButton = document.getElementById('clear-filter-btn');
    const projectContainers = document.querySelectorAll('.project-container');
    const pastContributionsSection = document.getElementById('past-contributions-section');
    const projectLinks = document.querySelectorAll('.project-filter-link');
    const stickyFilterPanel = document.querySelector('.filter-panel-glow');
    const toc = document.getElementById('TableOfContents');

    if (filterTags.length === 0 || projectContainers.length === 0) return;
    let activeTag = null;

    function scrollToElementWithOffset(element) {
      if (!element || !stickyFilterPanel) return;
      const stickyHeaderBottom = stickyFilterPanel.getBoundingClientRect().bottom;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - stickyHeaderBottom - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    function handleAnchorClick(e) {
      const link = e.currentTarget;
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          scrollToElementWithOffset(targetElement);
          history.pushState(null, null, targetId);
        }
      }
    }

    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (activeTag) clearFilter();
        handleAnchorClick(e);
      });
    });

    if (toc) {
      toc.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) handleAnchorClick({ currentTarget: link, preventDefault: () => e.preventDefault() });
      });
    }

    function applyFilter(selectedTag) {
      let firstVisibleProject = null;
      if (pastContributionsSection) pastContributionsSection.style.display = 'none';

      projectContainers.forEach(project => {
        const issues = project.querySelectorAll('.issue-item');
        let projectHasVisibleIssue = false;
        issues.forEach(issue => {
          const hasTag = issue.querySelector(`[data-issue-tag="${selectedTag}"]`);
          issue.style.display = hasTag ? 'flex' : 'none';
          if (hasTag) {
            projectHasVisibleIssue = true;
          }
        });

        project.style.display = projectHasVisibleIssue ? 'block' : 'none';

        if (projectHasVisibleIssue && !firstVisibleProject) {
          firstVisibleProject = project;
        }
      });

      return firstVisibleProject;
    }

    function clearFilter() {
      activeTag = null;
      updateTagStyles(null);
      if(clearButton) clearButton.classList.add('hidden');
      if (pastContributionsSection) pastContributionsSection.style.display = 'block';
      projectContainers.forEach(project => {
        project.style.display = 'block';
        project.querySelectorAll('.issue-item').forEach(issue => {
          issue.style.display = 'flex';
        });
      });
    }

    function updateTagStyles(selectedTag) {
      filterTags.forEach(tag => {
        tag.classList.toggle('is-active', tag.dataset.tag === selectedTag);
      });
    }

    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const selectedTag = tag.dataset.tag;
        if (activeTag === selectedTag) {
          clearFilter();
          return;
        }
        activeTag = selectedTag;
        updateTagStyles(selectedTag);
        if(clearButton) clearButton.classList.remove('hidden');
        const firstVisibleElement = applyFilter(selectedTag);
        if (firstVisibleElement) {
          scrollToElementWithOffset(firstVisibleElement);
        }
      });
    });

    if(clearButton) {
      clearButton.addEventListener('click', clearFilter);
    }

    const initialHash = window.location.hash;
    if (initialHash) {
      setTimeout(() => {
        const targetElement = document.querySelector(initialHash);
        if (targetElement) {
          scrollToElementWithOffset(targetElement);
        }
      }, 100);
    }
  };

  const initAll = () => {
    initCopyCodeButtons();
    initOgImageModal();
    initMissionBoardFilters();
    if (window.innerWidth > 768) {
      initContributionBubbles();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
