(function () {
  "use strict";

  const initContributionBubbles = () => {
    if (window.innerWidth <= 768) return;

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContributionBubbles);
  } else {
    initContributionBubbles();
  }
})();
