// ==UserScript==
// @name         NationStates Dark Background
// @namespace    https://nationstates.net/
// @version      1.1
// @description  Forces a black background on NationStates (client-side)
// @match        https://www.nationstates.net/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const css = `
        html, body, #container, #main, .main, .content {
            background: #000000 !important;
            background-image: none !important;
        }
    `;

    const style = document.createElement('style');
    style.id = 'ns-dark-bg';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
