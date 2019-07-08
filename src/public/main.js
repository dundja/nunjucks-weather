// Selectors
const date = document.querySelector("#curr-date");
const time = document.querySelector("#curr-time");
const dayTime = document.querySelectorAll(".day__time");
const form = document.querySelector(".location-data__form");
const input = document.querySelector("#location-input");

// icons
const icons = document.querySelectorAll(".icon");
const icon1 = document.getElementById("icon1");

date.innerHTML = new Date(+date.innerHTML * 1000).toLocaleDateString();
time.innerHTML = new Date(+time.innerHTML * 1000).toLocaleTimeString();

dayTime.forEach(day => {
    day.innerHTML = new Date(+day.innerHTML * 1000).toLocaleDateString();
});

// Handle weather icons
var skycons = new Skycons({ color: "rgba(255, 255, 255, 1)" });
let list = [
    "clear-day",
    "clear-night",
    "partly-cloudy-day",
    "partly-cloudy-night",
    "cloudy",
    "rain",
    "sleet",
    "snow",
    "wind",
    "fog"
];

icons.forEach(icon => {
    let condition = list.find(i => {
        return i === icon.classList[2];
    });
    let iconId = document.getElementById(icon.classList[1]);
    skycons.add(iconId, condition);
});
skycons.play();

// form listener
form.addEventListener("submit", async e => {
    e.preventDefault();

    const location = input.value;

    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("address", location);
    window.location.search = searchParams.toString();
});
