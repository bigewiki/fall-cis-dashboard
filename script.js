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
  document.getElementById("month-menu").style.display = "none";
  document.getElementById("day-menu").style.display = "none";
};

const getMonths = () => {
  createMenu(1, 12, "What month were you born?", "month-menu");
  document.getElementById("month-menu").style.display = "block";
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
  document.getElementById("day-menu").style.display = "block";
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
  } else {
    removeError(input);
  }
};

const setupListeners = () => {
  document.getElementById("username").onkeyup = checkUsername;
  document.getElementById("age").onkeyup = checkAge;
  document.getElementById("password").onkeyup = checkPassword;
  document.getElementById("year-menu").onclick = getMonths;
  document.getElementById("year-menu").onchange = getMonths;
  //document.getElementById("year-menu").onchange = checkYear;
};

const init = () => {
  getYears();
  setupListeners();
};

window.onload = init;
