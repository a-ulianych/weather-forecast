window.addEventListener("load", initClock);

function updateClock() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let currentMonth = currentDate.getMonth();
    let dayNumber = currentDate.getDate();
    let currentYear = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let period = "AM";

    if (hours === 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
        period = "PM";
    }

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
    let values = [days[currentDay], months[currentMonth], dayNumber, currentYear, hours, minutes, seconds, period];

    for (let i = 0; i < ids.length; i++) {
        let element = document.querySelector("#" + ids[i]);
        element.textContent = `${values[i]}`;

        if (hours < 10 && i === 4) {
            element.textContent = `0${values[i]}`;
        }
        if (minutes < 10 && i === 5) {
            element.textContent = `0${values[i]}`;
        }
        if (seconds < 10 && i === 6) {
            element.textContent = `0${values[i]}`;
        }
    }

}

function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}