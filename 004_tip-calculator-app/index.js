document.addEventListener("DOMContentLoaded", function () {
  validateNumberInputs();

  // TODO - When computing the final tip amount & total bill per person, prevent computation when input fields have error
});

function validateNumberInputs() {
  const billInputValueElement = document.getElementById("bill-input-value");
  const billInputValueErrorMessageElement = document.getElementById(
    "bill-input-value-error-message"
  );

  billInputValueElement.addEventListener("focusout", (event) => {
    const numberOfPeopleInputValue = event.target.value;

    // Add input-error class to input & make error message visible if input is invalid
    if (numberOfPeopleInputValue === 0 || numberOfPeopleInputValue === "") {
      billInputValueElement.classList.add("input-error");
      billInputValueErrorMessageElement.hidden = false;
    } else {
      // Remove input-error class & make error message hidden if input is valid
      billInputValueElement.classList.remove("input-error");
      billInputValueErrorMessageElement.hidden = true;
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
    }
  });
}
