// ==UserScript==
// @name         Badge Box Color (Actually Works)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  make the button turn red
// @author       Brilish
// @match        https://www.nationstates.net/page=disasterbadge*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function paintButtons() {
    document
      .querySelectorAll('button.button.icon.primary.approve')
      .forEach(btn => {
        btn.style.setProperty('background-color', 'red', 'important');
        btn.style.setProperty('border', '8px solid cyan', 'important');
      });
  }

  // run once when page loads
  window.addEventListener('load', paintButtons);

  // keep watching for DOM changes
  const observer = new MutationObserver(paintButtons);
  observer.observe(document.body, { childList: true, subtree: true });
})();
