document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("searchBtn");
    const weatherInfo = document.getElementById("weatherInfo");
    const cityName = document.getElementById("cityName");
    const temp = document.getElementById("temp");
    const description = document.getElementById("description");
    const errorMsg = document.getElementById("errorMsg");
    const APIkey = "INSERT OPENWETHER API KEY";

    searchBtn.addEventListener("click", async function () {
        const city = cityInput.value.trim();
        if (city === "") {
            ShowError();
        }
        try {
            const weatherData = await fetchData(city);
            displayWeather(weatherData);
        } catch (error) {
            ShowError();
        }
    });

    async function fetchData(city) {
        const responce = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
        );
        const data = await responce.json();
        console.log(data);
        if (data.cod != "200") {
            throw new Error("City not found");
        }
        return data;
    }
    function displayWeather(weatherData) {
        errorMsg.classList.add("hidden");
        weatherInfo.classList.remove("hidden");

        const { name, main, weather } = weatherData;
        cityName.innerText = name;
        temp.innerText = main.temp;
        description.innerText = weather[0].description;
    }
    function ShowError() {
        weatherInfo.classList.add("hidden");
        errorMsg.classList.remove("hidden");
    }
});
