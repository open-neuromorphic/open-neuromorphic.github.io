(function () {
  'use strict';

  // --- Search Modal ---
  const searchModal = document.querySelector('[data-search-modal]');
  const searchTriggers = document.querySelectorAll('[data-target="search-modal"]');
  const searchClose = document.querySelector('[data-search-close]');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchPlaceholder = document.getElementById('search-placeholder');

  if (!searchModal) return;

  let fuse;
  let searchData;
  let isFuseInitialized = false;
  let debounceTimer;

  // Function to load a script dynamically
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async function initFuse() {
    if (isFuseInitialized) return;
    try {
      // Check if Fuse is loaded, if not, load it.
      if (typeof Fuse === 'undefined') {
        if (!window.fuseJSSrc) {
          throw new Error('Fuse.js library source URL not provided via window.fuseJSSrc');
        }
        await loadScript(window.fuseJSSrc);
      }

      if (!window.searchIndexURL) {
        throw new Error('Search index URL not provided via window.searchIndexURL');
      }
      const response = await fetch(window.searchIndexURL);
      if (!response.ok) {
        throw new Error('Search index not found at ' + window.searchIndexURL);
      }
      searchData = await response.json();
      const options = {
        keys: [
          { name: 'title', weight: 1.0 },
          { name: 'description', weight: 0.4 },
          { name: 'content', weight: 0.2 },
          { name: 'tags', weight: 0.4 },
          { name: 'categories', weight: 0.4 }
        ],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.2, // Stricter search threshold
        sortFn: (a, b) => {
          // Primary sort: by score (ascending, lower is better)
          if (a.score !== b.score) {
            return a.score - b.score;
          }
          // Secondary sort: by priority (ascending, lower is better)
          if (a.item.priority !== b.item.priority) {
            return a.item.priority - b.item.priority;
          }
          // Tertiary sort: by original index in the list
          return a.refIndex - b.refIndex;
        }
      };
      fuse = new Fuse(searchData, options);
      isFuseInitialized = true;
      console.log('Fuse.js initialized.');
    } catch (e) {
      console.error('Failed to initialize Fuse.js:', e);
    }
  }

  const showModal = () => {
    searchModal.classList.remove('hidden');
    searchModal.classList.add('flex');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
    initFuse(); // Initialize on first open
  };

  const hideModal = () => {
    searchModal.classList.add('hidden');
    searchModal.classList.remove('flex');
    searchInput.value = '';
    searchResults.innerHTML = '';
    if (searchPlaceholder) {
      searchResults.appendChild(searchPlaceholder);
    }
    document.body.style.overflow = '';
  };

  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showModal();
    });
  });

  if (searchClose) searchClose.addEventListener('click', hideModal);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      hideModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
      hideModal();
    }
    // Hotkey: Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      showModal();
    }
  });

  if(searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!isFuseInitialized) {
          searchResults.innerHTML = '<div class="text-center text-gray-500 py-4">Initializing search...</div>';
          return;
        }
        const query = searchInput.value.trim();
        if (query.length < 2) {
          searchResults.innerHTML = '';
          if (searchPlaceholder) searchResults.appendChild(searchPlaceholder);
          return;
        }

        // --- Google Analytics Event Tracking ---
        if (typeof gtag === 'function') {
          gtag('event', 'search', {
            search_term: query
          });
          console.log(`GA Event sent: search, search_term: ${query}`);
        }
        // -----------------------------------------

        const results = fuse.search(query, { limit: 20 });
        renderResults(results, query);
      }, 500); // Wait 500ms after user stops typing
    });
  }

  function renderResults(results, query) {
    searchResults.innerHTML = '';
    if (results.length === 0) {
      searchResults.innerHTML = `<div class="text-center text-gray-500 py-4">No results found for "${query}"</div>`;
      return;
    }

    const resultList = document.createElement('ul');
    resultList.className = 'divide-y divide-border dark:divide-darkmode-border';

    results.forEach(({ item, matches }) => {
      const li = document.createElement('li');
      li.className = 'p-4 hover:bg-theme-light dark:hover:bg-darkmode-theme-dark/50 rounded-md';

      let title = item.title;
      let description = item.description || (item.content ? item.content.substring(0, 150) + '...' : '');

      const titleMatch = matches.find(m => m.key === 'title');
      if (titleMatch) {
        title = highlight(title, titleMatch.indices);
      }

      const descriptionMatch = matches.find(m => m.key === 'description');
      if (descriptionMatch) {
        description = highlight(description, descriptionMatch.indices);
      } else {
        const contentMatch = matches.find(m => m.key === 'content');
        if (contentMatch && item.content) {
          const start = Math.max(0, contentMatch.indices[0][0] - 30);
          const end = Math.min(item.content.length, contentMatch.indices[0][1] + 30);
          let snippet = item.content.substring(start, end);
          // Adjust indices for snippet
          const adjustedIndices = contentMatch.indices.map(([i, j]) => [i - start, j - start]);
          description = (start > 0 ? '...' : '') + highlight(snippet, adjustedIndices) + (end < item.content.length ? '...' : '');
        }
      }

      li.innerHTML = `
        <a href="${item.permalink}" class="block">
          <h4 class="text-lg font-semibold text-primary dark:text-darkmode-primary">${title}</h4>
          <p class="text-sm text-text dark:text-darkmode-text mt-1">${description}</p>
        </a>
      `;
      resultList.appendChild(li);
    });
    searchResults.appendChild(resultList);
  }

  function highlight(text, indices) {
    if (!text) return '';
    let result = '';
    let lastIndex = 0;
    indices.forEach(([start, end]) => {
      result += text.substring(lastIndex, start);
      result += `<mark class="bg-fuchsia-200/75 dark:bg-fuchsia-500/50 rounded px-1 py-0.5">${text.substring(start, end + 1)}</mark>`;
      lastIndex = end + 1;
    });
    result += text.substring(lastIndex);
    return result;
  }

})();
