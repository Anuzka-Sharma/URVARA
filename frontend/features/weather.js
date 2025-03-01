const apiKey = "7d219d7a843f1ef9da895e3c8c899e31"; // Tumhari API key

async function getWeather() {
    let city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod !== 200) {
            alert("City not found! Try again.");
            return;
        }

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById("weatherDesc").innerText = `Condition: ${data.weather[0].description}`;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.getElementById("weatherIcon").style.display = "block";

        document.getElementById("weatherContainer").style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong! Try again later.");
    }
}
