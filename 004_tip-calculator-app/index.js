document.addEventListener("DOMContentLoaded", function () {
  initPredefinedTips();
  initResetButton();
  initCustomTipInput();
  validateNumberInputs();

  // TODO - When computing the final tip amount & total bill per person, prevent computation when input fields have error
});

function initResetButton() {
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", (event) => {
    // Disable reset button
    resetButton.disabled = true;

    // Clear all input fields & calculated bill & tip values
    const billInputValue = document.getElementById("bill-input-value");
    billInputValue.value = "";

    const tipElement = document.querySelector('input[name="percent"]:checked');
    tipElement.checked = false;

    const customTipAmount = document.getElementById("custom-tip-amount");
    customTipAmount.value = "";

    const numberOfPeopleValue = document.getElementById(
      "number-of-people-value"
    );
    numberOfPeopleValue.value = "";

    const tipAmountValueElement = document.getElementById("tip-amount-value");
    tipAmountValueElement.innerHTML = "$0.00";

    const billTotalValueElement = document.getElementById("bill-total-value");
    billTotalValueElement.innerHTML = "$0.00";
  });
}

function initPredefinedTips() {
  const radioButtons = document.getElementsByName("percent");
  [...radioButtons].forEach((radioButton) => {
    if (radioButton.id !== "percent-custom") {
      radioButton.addEventListener("click", (event) => {
        calculate();
      });
    }
  });
}

function initCustomTipInput() {
  const customTipAmountInput = document.getElementById("custom-tip-amount");

  customTipAmountInput.addEventListener("click", (event) => {
    const percentCustomInput = document.getElementById("percent-custom");
    percentCustomInput.checked = true;
  });

  customTipAmountInput.addEventListener("blur", (event) => {
    if (!customTipAmountInput.value) {
      customTipAmountInput.value = 0;
    } else {
      document.getElementById("percent-custom").value =
        customTipAmountInput.value;
    }

    // Calculate bill & tip
    calculate();
  });
}

function validateNumberInputs() {
  const billInputValueElement = document.getElementById("bill-input-value");
  const billInputValueErrorMessageElement = document.getElementById(
    "bill-input-value-error-message"
  );

  billInputValueElement.addEventListener("focusout", (event) => {
    const billInputValue = event.target.value;

    // Add input-error class to input & make error message visible if input is invalid
    if (billInputValue === 0 || billInputValue === "") {
      billInputValueElement.classList.add("input-error");
      billInputValueErrorMessageElement.hidden = false;
    } else {
      // Remove input-error class & make error message hidden if input is valid
      billInputValueElement.classList.remove("input-error");
      billInputValueErrorMessageElement.hidden = true;

      // Calculate bill & tip
      calculate();
    }
  });

  const numberOfPeopleValueElement = document.getElementById(
    "number-of-people-value"
  );
  const numberOfPeopleValueErrorMessageElement = document.getElementById(
    "number-of-people-value-error-message"
  );

  numberOfPeopleValueElement.addEventListener("focusout", (event) => {
    const numberOfPeopleInputValue = event.target.value;

    // Add input-error class to input & make error message visible if input is invalid
    if (numberOfPeopleInputValue === 0 || numberOfPeopleInputValue === "") {
      numberOfPeopleValueElement.classList.add("input-error");
      numberOfPeopleValueErrorMessageElement.hidden = false;
    } else {
      // Remove input-error class & make error message hidden if input is valid
      numberOfPeopleValueElement.classList.remove("input-error");
      numberOfPeopleValueErrorMessageElement.hidden = true;

      // Calculate bill & tip
      calculate();
    }
  });
}

function calculate() {
  // Retrieve bill value
  const billInputValue = Number(
    document.querySelector("#bill-input-value").value
  );

  const tipElement = document.querySelector('input[name="percent"]:checked');
  var tipValue;
  if (tipElement) {
    tipValue = Number(tipElement.value);
  }

  // Retrieve numer of people value
  const numberOfPeopleInputValue = Number(
    document.querySelector("#number-of-people-value").value
  );

  // Calculate the bill & tip amount per person if the required values are input
  if (billInputValue && tipValue && numberOfPeopleInputValue) {
    // Calculate & show the total bill per person
    const totalBillValue = billInputValue * (1 + tipValue / 100);
    const billPerPerson = (totalBillValue / numberOfPeopleInputValue).toFixed(
      2
    );

    const billTotalValueElement = document.getElementById("bill-total-value");
    billTotalValueElement.innerHTML = `$${billPerPerson}`;

    // Calculate & show the total tip per person
    const totalTipValue = (tipValue / 100) * billInputValue;
    const tipPerPerson = (totalTipValue / numberOfPeopleInputValue).toFixed(2);

    const tipAmountValueElement = document.getElementById("tip-amount-value");
    tipAmountValueElement.innerHTML = `${tipPerPerson}`;

    // Make Reset button selectable
    const resetButton = document.getElementById("reset-button");
    resetButton.disabled = false;
  }
}
