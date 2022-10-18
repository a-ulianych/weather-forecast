const cityName = document.querySelector("#city_name");
const weather = document.querySelector("#weather_text");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const wind = document.querySelector("#wind");
const cityInput = document.querySelector("#city_input");
const placeholder = document.querySelector(".placeholder");
const weatherIcon = document.querySelector("#weather-icon");

getWeather("London", "metric");

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && cityInput.value) {
        getWeather(cityInput.value, "metric");
        cityInput.value = "";
        document.body.className = "";
    }
});

function getWeather(city, unitSys) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + `${city}` + "&appid=b70c3a68dde572688afd5856db8a44db&units=" + `${unitSys}`;
    let sign = "&#8451";
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log(response.status);
            }
        })
        .then(json => {
            cityName.textContent = json.name;
            weather.textContent = json.weather[0].main;
            temperature.innerHTML = Math.round(json.main.temp) + sign;
            humidity.textContent = json.main.humidity + "%";
            pressure.textContent = json.main.pressure + " hPa";
            wind.textContent = json.wind.speed + " m/s";

            switch (json.weather[0].main) {
                case "Clear":
                    weatherIcon.src = "img/clear.png";
                    document.body.classList.add("clear");
                    break;
                case "Clouds":
                    weatherIcon.src = "img/clouds.png";
                    document.body.classList.add("clouds");
                    break;
                case "Drizzle":
                    weatherIcon.src = "img/drizzle.png";
                    document.body.classList.add("clouds");
                    break;
                case "Rain":
                    weatherIcon.src = "img/rain.png";
                    document.body.classList.add("clouds");
                    break;
                case "Thunderstorm":
                    weatherIcon.src = "img/thunderstorm.png";
                    document.body.classList.add("clouds");
                    break;
                case "Snow":
                    weatherIcon.src = "img/snow.png";
                    document.body.classList.add("clouds");
                    break;
            }
        })
        .catch(error => console.error(error.message));
}