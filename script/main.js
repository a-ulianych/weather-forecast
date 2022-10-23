// Current weather DOM Elements
const cityName = document.querySelector("#city_name");
const weather = document.querySelector("#weather_text");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const wind = document.querySelector("#wind");
const cityInput = document.querySelector("#city_input");
const placeholder = document.querySelector(".placeholder");
const weatherIcon = document.querySelector("#weather-icon");
const forecast = document.querySelector(".weekly-forecast");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let dayCounter = 0;
let dataCounter = 0;
class WeatherCard {
    constructor(maxTemperature, minTemperature, image, weather) {
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
        this.image = image;
        this.weather = weather;
        this.card = null;
    }

    createCard() {
        this.card = document.createElement("div");
        this.card.classList.add("day");

        let currentDate = new Date();
        let dayName = document.createElement("p");
        dayName.classList.add("day-name");
        let dayNumber = currentDate.getDay() + dayCounter;
        if (dayNumber >= 6) {
            dayCounter = -1;
        }

        let date = currentDate.getDate() + dataCounter;
        dayName.textContent = `${days[dayNumber]} ${date}`;
        dayCounter++;
        dataCounter++;

        let temperature = document.createElement("p");
        temperature.classList.add("temperature");
        temperature.innerHTML = `${Math.round(this.maxTemperature)} ${sign} / ${Math.round(this.minTemperature)} ${sign}`;

        let image = document.createElement("img");
        image.classList.add("medium-icon");
        image.alt = "weather-icon";
        image.src = this.image;

        let weather = document.createElement("p");
        weather.textContent = this.weather;

        this.card.append(dayName);
        this.card.append(temperature);
        this.card.append(image);
        this.card.append(weather);

        forecast.append(this.card);
    }
}

getWeather("London", "metric");

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && cityInput.value) {
        getWeather(cityInput.value, "metric");
        cityInput.value = "";
        document.body.className = "";
        forecast.innerHTML = "";
        dayCounter = 0;
        dataCounter = 0;
    }
});

let sign = " &#8451";
function getWeather(city, unitSys) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + `${city}` + "&appid=b70c3a68dde572688afd5856db8a44db&units=" + `${unitSys}`;
    let lat;
    let lon;

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
            lat = json.coord.lat;
            lon = json.coord.lon;

            cityName.innerHTML = json.name + ", " + json.sys.country;
            temperature.innerHTML = Math.round(json.main.temp) + sign;
            humidity.textContent = json.main.humidity + " %";
            pressure.textContent = json.main.pressure + " hPa";
            wind.textContent = json.wind.speed + " m/s";
            weather.textContent = json.weather[0].main;

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

            let urlForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` + "&lon=" + `${lon}` + "&appid=4425a9f34cbb63efc040f592aaeb8eed&units=metric";

            fetch(urlForecast)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        console.log(response.status);
                    }
                })
                .then(json => {
                    let forecast = json.daily;

                    forecast.forEach(day => {
                        let src;
                        switch (day.weather[0].main) {
                            case "Clear":
                                src = "img/clear.png";
                                break;
                            case "Clouds":
                                src = "img/clouds.png";
                                break;
                            case "Drizzle":
                                src = "img/drizzle.png";
                                break;
                            case "Rain":
                                src = "img/rain.png";
                                break;
                            case "Thunderstorm":
                                src = "img/thunderstorm.png";
                                break;
                            case "Snow":
                                src = "img/snow.png";
                                break;
                        }

                        let card = new WeatherCard(day.temp.max, day.temp.min , src, day.weather[0].main);
                        card.createCard();
                    });
                })
                .catch(error => console.error(error.message));
        })
        .catch(error => console.error(error.message));
}