(function() {
  "use strict";

  const localizeTimes = () => {
    const timeElements = document.querySelectorAll('.event-local-time');
    if (!timeElements.length) return;

    const formatter = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    timeElements.forEach(el => {
      const startStr = el.getAttribute('data-start');
      const endStr = el.getAttribute('data-end');
      if (!startStr || !endStr) return;

      try {
        const startDate = new Date(startStr);
        const endDate = new Date(endStr);

        el.setAttribute('title', `Original host time: ${el.textContent.trim()}`);

        if (startDate.getTime() === endDate.getTime()) {
          el.textContent = formatter.format(startDate);
        } else {
          try {
            el.textContent = formatter.formatRange(startDate, endDate);
          } catch (rangeErr) {
            // Fallback for older browsers lacking formatRange support
            const s = formatter.format(startDate);
            const e = formatter.format(endDate);
            // Deduplicate the timezone name if it appears in both
            const tzMatch = s.match(/[A-Z]{3,4}$/i);
            const tz = tzMatch ? tzMatch[0] : '';
            el.textContent = `${s.replace(tz, '').trim()} - ${e}`;
          }
        }

        el.classList.add('localized');
      } catch (e) {
        console.warn("Failed to localize event time:", e);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', localizeTimes);
  } else {
    localizeTimes();
  }
})();
