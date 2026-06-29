(function () {
  "use strict";

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMissionBoardFilters);
  } else {
    initMissionBoardFilters();
  }
})();
