// ==UserScript==
// @name         GotIssues Enlarge Open Available Link Button
// @namespace    http://violentmonkey.net/
// @version      1.0
// @description  Makes the "Open Available Link" button 3x bigger
// @match        https://hare.kractero.com/tools/gotissues*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function resizeButton() {
        const buttons = document.querySelectorAll('button');

        buttons.forEach(btn => {
            if (btn.textContent.includes('Open Available Link')) {
                btn.style.transform = "scale(1.5)";
                btn.style.transformOrigin = "center";
                btn.style.fontSize = "8px";
                btn.style.padding = "16px 24px";
                btn.style.height = "auto";
            }
        });
    }

    // Run once
    resizeButton();

    // Observe in case it loads dynamically (React/Vue/etc)
    const observer = new MutationObserver(resizeButton);
    observer.observe(document.body, { childList: true, subtree: true });
})();
