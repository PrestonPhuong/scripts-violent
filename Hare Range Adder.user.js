// ==UserScript==
// @name         Hare Range Adder
// @namespace    kractero-tools
// @version      1.2
// @description  Adds styled range inputs for ASD and Miner next to #pup textarea
// @match        https://hare.kractero.com/tools/gotissues*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function setNativeValue(element, value) {
        const prototype = Object.getPrototypeOf(element);
        const valueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
        valueSetter.call(element, value);

        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function init() {
        const textarea = document.getElementById("pup");
        if (!textarea) return;
        if (document.getElementById("vm-range-wrapper")) return;

        const wrapper = document.createElement("div");
        wrapper.id = "vm-range-wrapper";
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.gap = "6px";
        wrapper.style.marginTop = "8px";
        wrapper.style.maxWidth = "200px";

        function styledInput(input) {
            input.type = "number";
            input.style.width = "70px";
            input.style.padding = "4px";
            input.style.background = "#1e1e1e";
            input.style.color = "#ffffff";
            input.style.border = "1px solid #ffffff";
            input.style.borderRadius = "3px";
            input.style.fontSize = "12px";
        }

        function createRangeSection(labelText) {
            const section = document.createElement("div");
            section.style.display = "flex";
            section.style.flexDirection = "column";
            section.style.gap = "4px";

            const label = document.createElement("strong");
            label.textContent = labelText;
            label.style.fontSize = "12px";
            label.style.color = "#ffffff";

            const inputsRow = document.createElement("div");
            inputsRow.style.display = "flex";
            inputsRow.style.gap = "4px";

            const startInput = document.createElement("input");
            startInput.placeholder = "Start";
            styledInput(startInput);

            const endInput = document.createElement("input");
            endInput.placeholder = "End";
            styledInput(endInput);

            inputsRow.appendChild(startInput);
            inputsRow.appendChild(endInput);

            section.appendChild(label);
            section.appendChild(inputsRow);

            return { section, startInput, endInput };
        }

        const asd = createRangeSection("ASD");
        const miner = createRangeSection("Miner");

        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.textContent = "Add Range";

        // Dark grey gradient styling (based on your shuffle script logic)
        const baseGradient = "linear-gradient(to bottom, rgb(80,80,80) 0%, rgb(40,40,40) 100%)";
        const hoverGradient = "linear-gradient(to bottom, rgb(110,110,110) 0%, rgb(60,60,60) 100%)";
        const activeGradient = "linear-gradient(to bottom, rgb(40,40,40) 0%, rgb(80,80,80) 100%)";

        addBtn.style.marginTop = "4px";
        addBtn.style.padding = "5px 10px";
        addBtn.style.fontSize = "12px";
        addBtn.style.fontFamily = "Verdana, Arial, sans-serif";
        addBtn.style.color = "#ffffff";
        addBtn.style.background = baseGradient;
        addBtn.style.border = "1px solid #222";
        addBtn.style.borderRadius = "3px";
        addBtn.style.cursor = "pointer";
        addBtn.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.3)";

        addBtn.addEventListener("mouseover", () => {
            addBtn.style.background = hoverGradient;
        });

        addBtn.addEventListener("mouseout", () => {
            addBtn.style.background = baseGradient;
        });

        addBtn.addEventListener("mousedown", () => {
            addBtn.style.background = activeGradient;
        });

        addBtn.addEventListener("mouseup", () => {
            addBtn.style.background = hoverGradient;
        });

        addBtn.addEventListener("click", function () {
            let output = [];

            function generateRange(start, end, formatter) {
                start = parseInt(start);
                end = parseInt(end);
                if (isNaN(start) || isNaN(end) || start > end) return [];

                let arr = [];
                for (let i = start; i <= end; i++) {
                    arr.push(formatter(i));
                }
                return arr;
            }

            output = output.concat(
                generateRange(asd.startInput.value, asd.endInput.value, i => `asd${i}`)
            );

            output = output.concat(
                generateRange(miner.startInput.value, miner.endInput.value, i => `The miner ${i}`)
            );

            if (output.length > 0) {
                const newValue = textarea.value
                    ? textarea.value + "\n" + output.join("\n")
                    : output.join("\n");

                setNativeValue(textarea, newValue);
            }

            asd.startInput.value = "";
            asd.endInput.value = "";
            miner.startInput.value = "";
            miner.endInput.value = "";
        });

        wrapper.appendChild(asd.section);
        wrapper.appendChild(miner.section);
        wrapper.appendChild(addBtn);

        textarea.insertAdjacentElement("afterend", wrapper);
    }

    const observer = new MutationObserver(init);
    observer.observe(document.body, { childList: true, subtree: true });

})();
