import WEATHER_API_KEY from "./config.js";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const response = await fetch(`${apiUrl+city}&appid=${WEATHER_API_KEY}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    let data = await response.json();
    document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°c`;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} m/s`;

    switch (data.weather[0].main) {
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Snow":
            weatherIcon.src = "images/snow.png";
            break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") getWeather(searchBox.value);
});

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value)
});
