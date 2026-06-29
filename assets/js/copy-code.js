(function () {
  "use strict";

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyCodeButtons);
  } else {
    initCopyCodeButtons();
  }
})();
