//prettier-ignore
const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const createMenu = (startNum, endNum, menuMsg, targetId) => {
  let strMsg = `<option style="display:none" value="">${menuMsg}</option>`;
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
  document.getElementById("year-menu").onchange = getMonths;
  document.getElementById("month-menu").style.display = "none";
  document.getElementById("day-menu").style.display = "none";
};

const getMonths = () => {
  createMenu(1, 12, "What month were you born?", "month-menu");
  document.getElementById("month-menu").style.display = "block";
  document.getElementById("month-menu").onchange = getDays;
};

const getDays = () => {
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

const init = () => {
  getYears();
};

window.onload = init;
