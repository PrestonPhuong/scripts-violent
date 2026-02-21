// ==UserScript==
// @name         Streamline Open Pack
// @namespace    Kractero
// @version      1.1
// @description  Enter goes to /page=deck on loot results. Closes auctions tab.
// @match        https://www.nationstates.net/*
// @grant        window.close
// ==/UserScript==

(function () {
  'use strict';

  // 🔹 Close tab automatically if on auctions page
  if (window.location.href === 'https://www.nationstates.net/page=deck/show_market=auctions') {
    window.close();
    return;
  }

  function init() {
    // Detect loot box result container
    const lootBoxDetected = document.querySelector('.decklist.deck-loot-box');
    if (!lootBoxDetected) return;

    // Prevent duplicate listener
    if (document.getElementById('SOP_enter_listener')) return;

    const marker = document.createElement('div');
    marker.id = 'SOP_enter_listener';
    marker.style.display = 'none';
    document.body.appendChild(marker);

    document.addEventListener(
      'keydown',
      function (event) {
        if (event.key !== 'Enter') return;

        const deckLink = document.querySelector('a[href*="page=deck"]');
        if (!deckLink) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        window.location.href = deckLink.href;
      },
      { capture: true }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
