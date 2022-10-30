const countdownForm = document.getElementById("countDownForm");
const inputContainer = document.getElementById("input-container");
const dateEl = document.getElementById("date-picker");
const countDownEl = document.getElementById("countdown");

const countdownTitleEl = document.getElementById("countdown-title");
const countdownButtonEl = document.getElementById("countdown-button");
const timeEl = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");

const completeInfoEl = document.getElementById("complete-info");
const completeButtonEl = document.getElementById("complete-button");

//variable to control function

let countDownTitle = "";
let countDownDate = "";

let countDownValue = Date; // Keep date
let countDownActive; //counting time
let saveCountDown; //Keep notification (object)

//convert time

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

countdownForm.addEventListener("submit", updateCountDown);

function updateCountDown(e) {
  e.preventDefault();
  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;

  if (countDownTitle === "") {
    alert("Please fill out the form below");
  } else {
    saveCountDown = { title: countDownTitle, date: countDownDate };
    localStorage.setItem("countDown", JSON.stringify(saveCountDown));
    countDownValue = new Date(countDownDate).getTime(); //time that already set
    setUpTime();
  }
}
function setUpTime() {
  countDownActive = setInterval(() => {
    //time set - present time
    const now = new Date().getTime();
    const distance = countDownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    inputContainer.hidden = true;

    if (distance < 0) {
      countDownEl.hidden = true;
      completeEl.hidden = false;
      // Holiday 29/10/22
      completeInfoEl.textContent = `${countDownTitle} Date ${countDownDate}`;
      clearInterval(countDownActive);
    } else {
      countdownTitleEl.textContent = `${countDownTitle}`;
      //countdown time
      timeEl[0].textContent = `${days}`;
      timeEl[1].textContent = `${hours}`;
      timeEl[2].textContent = `${minutes}`;
      timeEl[3].textContent = `${seconds}`;

      countDownEl.hidden = false;
      completeInfoEl.hidden = true;
    }
  }, second);
}

function callDataInStore() {
  if (localStorage.getItem("countDown")) {
    inputContainer.hidden = true;
    saveCountDown = JSON.parse(localStorage.getItem("countDown"));
    countDownTitle = saveCountDown.title;
    countDownDate = saveCountDown.date;
    countDownValue = new Date(countDownDate).getTime();
    setUpTime();
  }
}

function reset() {
  localStorage.removeItem("countDown");
  countDownEl.hidden = true;
  completeInfoEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countDownActive);
  countDownTitle = " ";
  countDownDate = " ";
}
callDataInStore();
countdownButtonEl.addEventListener("click", reset);
completeButtonEl.addEventListener("click", reset);
