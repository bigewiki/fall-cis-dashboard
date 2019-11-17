//prettier-ignore
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const createMenu = (startNum, endNum, menuMsg, targetId) => {
  let strMsg = `<option value="none">${menuMsg}</option>`;
  let counter = startNum;
  let optionDisplay;
  while (counter <= endNum) {
    targetId === "month-menu"
      ? (optionDisplay = monthList[counter - 1])
      : (optionDisplay = counter);
    strMsg += `<option value="${counter}">${optionDisplay}</option>`;
    counter++;
  }
  document.getElementById(targetId).innerHTML = strMsg;
};

const getYears = () => {
  const today = new Date();
  const oldYear = today.getFullYear() - 125;
  const thisYear = today.getFullYear();
  createMenu(oldYear, thisYear, "What year were you born?", "year-menu");
  document.getElementById("month-wrapper").style.display = "none";
  document.getElementById("day-wrapper").style.display = "none";
};

const getMonths = () => {
  createMenu(1, 12, "What month were you born?", "month-menu");
  document.getElementById("month-wrapper").style.display = "block";
  document.getElementById("month-menu").onchange = getDays;
  document.getElementById("month-menu").onclick = getDays;
  checkSelect("year", "You must select a year");
};

const checkDays = () => {
  checkSelect("day", "You must select a day");
};

const getDays = () => {
  checkSelect("month", "You must select a month");
  document.getElementById("day-menu").onchange = checkDays;
  document.getElementById("day-menu").onclick = checkDays;
  const month = document.getElementById("month-menu").value;
  const year = document.getElementById("year-menu").value;
  const birthMonth = new Date();
  birthMonth.setMonth(month - 1);
  birthMonth.setYear(year);
  const lastDay = new Date(
    birthMonth.getFullYear(),
    birthMonth.getMonth() + 1,
    0
  ).getDate();
  createMenu(1, lastDay, "What day were you born?", "day-menu");
  document.getElementById("day-wrapper").style.display = "block";
};

const displayError = (input, message) => {
  document.getElementById(`${input}-error`).innerHTML = message;
  document
    .getElementById(`${input}-wrapper`)
    .classList.add("error-alert-wrapper");
};

const removeError = input => {
  document
    .getElementById(`${input}-wrapper`)
    .classList.remove("error-alert-wrapper");
  document.getElementById(`${input}-error`).innerHTML = "";
};

const checkUsername = () => {
  if (document.getElementById("username").value.length < 1) {
    displayError("username", "Username cannot be blank");
  } else {
    removeError("username");
  }
};

const checkAge = () => {
  const ageInput = document.getElementById("age").value;
  if (ageInput.length < 1) {
    displayError("age", "Age cannot be blank");
  } else if (isNaN(ageInput)) {
    displayError("age", "Age must be a number");
  } else if (parseInt(ageInput) < 1) {
    displayError("age", "Age must be greater than 0");
  } else if (parseInt(ageInput) > 125) {
    displayError(
      "age",
      "Not accepting users claiming to be over the age of 125"
    );
  } else {
    removeError("age");
  }
};

const checkPassword = () => {
  const passLength = document.getElementById("password").value.length;
  if (passLength < 8 || passLength > 25) {
    displayError(
      "password",
      "Password must be between 8 and 25 characters long"
    );
  } else {
    removeError("password");
  }
};

const checkSelect = (input, error) => {
  const yearSelect = document.getElementById(`${input}-menu`).value;
  if (yearSelect === "none") {
    displayError(input, error);
    return false;
  } else {
    removeError(input);
    return true;
  }
};

const checkBio = () => {
  const bioVal = document.getElementById("bio").value.length;
  const bioErr = document.getElementById("bio-error");
  if (bioVal > 0 && bioVal <= 500) {
    bioErr.innerHTML = `You have ${500 - bioVal} characters remaining`;
    document
      .getElementById(`bio-wrapper`)
      .classList.remove("error-alert-wrapper");
  } else {
    displayError(
      "bio",
      "Biography cannot be blank or more than 500 characters"
    );
  }
};

const checkIfChecked = (input, message) => {
  const nodeArray = document.querySelectorAll(`#${input}-wrapper input`);
  if (Array.from(nodeArray).filter(item => item.checked).length === 0) {
    displayError(input, message);
  } else {
    removeError(input);
  }
};

const checkOptions = () => {
  checkIfChecked("options", "We need one of thsese things from the user...");
};

const checkRole = () => {
  checkIfChecked("role", "You must select a role");
};

const checkTimezone = () => {
  checkIfChecked("timezone", "You must select a timezone");
};

const checkEverything = () => {
  checkUsername();
  checkAge();
  checkPassword();
  checkBio();
  checkOptions();
  checkRole();
  checkTimezone();
  checkSelect("day", "You must select a day");
  checkSelect("month", "You must select a month");
  checkSelect("year", "You must select a year");
  return false;
};

const setupListeners = () => {
  document.getElementById("username").onkeyup = checkUsername;
  document.getElementById("age").onkeyup = checkAge;
  document.getElementById("password").onkeyup = checkPassword;
  document.getElementById("year-menu").onclick = getMonths;
  document.getElementById("year-menu").onchange = getMonths;
  document.getElementById("bio").onkeyup = checkBio;
  document.getElementById("bio").onclick = checkBio;
  document.getElementById("options-wrapper").onmouseover = checkOptions;
  document.getElementById("role-wrapper").onmouseover = checkRole;
  document.getElementById("timezone-wrapper").onmouseover = checkTimezone;
  document.forms[0].onsubmit = checkEverything;
};

const init = () => {
  getYears();
  setupListeners();
};

window.onload = init;
