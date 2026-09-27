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

  // tip & total calculation
  const tipOutput = document.getElementById("tip-amount-output");
  const totalOutput = document.getElementById("total-output");
  const tipRadios = document.querySelectorAll('input[name="tip"]');
  // reset button element
  const resetButton = document.getElementById("reset-button");

  function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }

  function calculate() {
    const billValid = billInput.value !== "" && billInput.validity.valid;
    const peopleValid = peopleInput.value !== "" && peopleInput.validity.valid;
    const checkedTip = document.querySelector('input[name="tip"]:checked');

    const formValid = billValid && peopleValid && checkedTip;

    if (!formValid) {
      tipOutput.textContent = formatCurrency(0);
      totalOutput.textContent = formatCurrency(0);
      return;
    }

    resetButton.disabled = !formValid;

    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value, 10);
    const tipRate = parseFloat(checkedTip.value) / 100;

    tipOutput.textContent = formatCurrency((bill * tipRate) / people);
    totalOutput.textContent = formatCurrency((bill * (1 + tipRate)) / people);
  }

  billInput.addEventListener("input", calculate);
  peopleInput.addEventListener("input", calculate);
  tipRadios.forEach((radio) => radio.addEventListener("change", calculate));
});
