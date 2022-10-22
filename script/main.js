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

getWeather("London", "metric");

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && cityInput.value) {
        getWeather(cityInput.value, "metric");
        cityInput.value = "";
        document.body.className = "";
        forecast.innerHTML = "";
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
            console.log(json);
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
                    console.log(forecast);

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

                        let card = new WeatherCard(day.temp.day, src, day.weather[0].main);
                        card.createCard();
                    });
                })
                .catch(error => console.error(error.message));
        })
        .catch(error => console.error(error.message));
}

class WeatherCard {
    constructor(temperature, image, weather) {
        this.temperature = temperature;
        this.image = image;
        this.weather = weather;
        this.card = null;
    }

    createCard() {
        this.card = document.createElement("div");
        this.card.classList.add("day");

        let dayName = document.createElement("p");
        dayName.textContent = "TEST";

        let temperature = document.createElement("p");
        temperature.classList.add("temperature");
        temperature.innerHTML = `${Math.round(this.temperature)}` + sign;

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