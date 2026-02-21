// ==UserScript==
// @name         Hare Gotissues Shuffle
// @namespace    kractero-tools
// @version      1.1.3
// @description  Adds a styled shuffle button to every textarea (framework safe)
// @match        https://hare.kractero.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function setNativeValue(element, value) {
    const prototype = Object.getPrototypeOf(element);
    const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
    valueSetter.call(element, value);

    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function shuffleTextarea(textarea) {
    const text = textarea.value;
    const parts = text.split(/\n/); // shuffle lines
    const shuffled = shuffleArray(parts).join("\n");
    setNativeValue(textarea, shuffled);
  }

  function createButton(textarea) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Shuffle";

    const baseGradient = "linear-gradient(to bottom, rgb(238 112 255) 0%, rgb(112 64 104) 100%)";
    const hoverGradient = "linear-gradient(to bottom, rgb(255 140 255) 0%, rgb(130 75 120) 100%)";
    const activeGradient = "linear-gradient(to bottom, rgb(112 64 104) 0%, rgb(238 112 255) 100%)";

    btn.style.margin = "4px 0";
    btn.style.display = "block";
    btn.style.padding = "4px 10px";
    btn.style.fontSize = "12px";
    btn.style.fontFamily = "Verdana, Arial, sans-serif";
    btn.style.color = "#ffffff";
    btn.style.background = baseGradient;
    btn.style.border = "1px solid rgb(90 40 85)";
    btn.style.borderRadius = "3px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.4)";

    btn.addEventListener("mouseover", () => {
      btn.style.background = hoverGradient;
    });

    btn.addEventListener("mouseout", () => {
      btn.style.background = baseGradient;
    });

    btn.addEventListener("mousedown", () => {
      btn.style.background = activeGradient;
    });

    btn.addEventListener("mouseup", () => {
      btn.style.background = hoverGradient;
    });

    btn.addEventListener("click", () => shuffleTextarea(textarea));

    return btn;
  }

  function attachButtons() {
    document.querySelectorAll("textarea").forEach((textarea) => {
      if (textarea.dataset.vmShuffleAttached) return;
      textarea.dataset.vmShuffleAttached = "true";

      const btn = createButton(textarea);
      textarea.insertAdjacentElement("afterend", btn);
    });
  }

  attachButtons();

  const observer = new MutationObserver(attachButtons);
  observer.observe(document.body, { childList: true, subtree: true });

})();
