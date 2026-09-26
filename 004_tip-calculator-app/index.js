document.addEventListener("DOMContentLoaded", function () {
  function restrictKeystrokes(input, isAllowedKey) {
    input.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.key.length > 1) return;
      if (!isAllowedKey(e.key, input.value)) {
        e.preventDefault();
      }
    });
  }

  function wireValidity(input, errorEl) {
    input.addEventListener("input", () => {
      const valid = input.validity.valid;
      errorEl.hidden = valid;
      input.setAttribute("aria-invalid", String(!valid));
    });
  }

  // number input for bill amount
  const billInput = document.getElementById("bill-amount");
  wireValidity(billInput, document.getElementById("bill-amount-error"));
  restrictKeystrokes(billInput, (key, value) => {
    if (/^[0-9]$/.test(key)) {
      const decimalIndex = value.indexOf(".");
      // ponytail: assumes left-to-right typing (selectionStart is unavailable
      // on type="number" inputs, so mid-string edits can't be detected here)
      return decimalIndex === -1 || value.length - decimalIndex - 1 < 2;
    }
    return key === "." && !value.includes(".");
  });

  // number input for people count
  const peopleInput = document.getElementById("people-count");
  wireValidity(peopleInput, document.getElementById("people-count-error"));
  restrictKeystrokes(peopleInput, (key) => /^[0-9]$/.test(key));
});
